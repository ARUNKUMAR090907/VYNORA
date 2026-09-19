import JSZip from 'jszip';

/**
 * Compresses an image file (dataUrl or File) to a target maximum size in KB (default: 100 KB).
 * Uses iterative canvas downsampling and quality binary search.
 */
export async function compressImageToTargetKB(
  sourceDataUrl,
  targetKB = 100,
  maxDimension = 1600
) {
  const targetBytes = targetKB * 1024;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;

      // Scale down if dimensions exceed maximum
      if (width > maxDimension || height > maxDimension) {
        const ratio = Math.min(maxDimension / width, maxDimension / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Failed to create canvas 2D context'));
      }

      // Draw with white background in case of PNG with transparency
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      const originalEstimateBytes = Math.round(sourceDataUrl.length * 0.75);

      // Binary search for optimal JPEG quality to match target size
      let minQuality = 0.05;
      let maxQuality = 0.98;
      let bestBlob = null;
      let bestQuality = 0.8;
      let bestDataUrl = '';

      // Perform binary search iterations
      for (let iter = 0; iter < 7; iter++) {
        const testQuality = (minQuality + maxQuality) / 2;
        const currentDataUrl = canvas.toDataURL('image/jpeg', testQuality);
        const currentBytes = Math.round(currentDataUrl.length * 0.75);

        if (currentBytes <= targetBytes) {
          bestBlob = dataURItoBlob(currentDataUrl);
          bestDataUrl = currentDataUrl;
          bestQuality = testQuality;
          minQuality = testQuality; // Try higher quality
        } else {
          maxQuality = testQuality; // Reduce quality
        }
      }

      // If even at low quality it exceeds, resize canvas down
      if (!bestDataUrl || (bestBlob && bestBlob.size > targetBytes)) {
        let scale = 0.8;
        while (scale > 0.2) {
          const scaledW = Math.round(width * scale);
          const scaledH = Math.round(height * scale);
          canvas.width = scaledW;
          canvas.height = scaledH;

          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, scaledW, scaledH);
          ctx.drawImage(img, 0, 0, scaledW, scaledH);

          const candidateDataUrl = canvas.toDataURL('image/jpeg', 0.65);
          const candidateBlob = dataURItoBlob(candidateDataUrl);

          if (candidateBlob.size <= targetBytes || scale <= 0.3) {
            bestBlob = candidateBlob;
            bestDataUrl = candidateDataUrl;
            width = scaledW;
            height = scaledH;
            bestQuality = 0.65;
            break;
          }
          scale -= 0.15;
        }
      }

      const finalBlob = bestBlob || dataURItoBlob(bestDataUrl || sourceDataUrl);
      const finalBytes = finalBlob.size;
      const compressionRatio = originalEstimateBytes > 0 
        ? Math.max(0, Math.round(((originalEstimateBytes - finalBytes) / originalEstimateBytes) * 100))
        : 0;

      resolve({
        dataUrl: bestDataUrl || sourceDataUrl,
        blob: finalBlob,
        originalSizeBytes: originalEstimateBytes,
        compressedSizeBytes: finalBytes,
        compressionRatioPercent: compressionRatio,
        width,
        height,
        qualityUsed: Math.round(bestQuality * 100)
      });
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for compression'));
    };

    img.src = sourceDataUrl;
  });
}

/**
 * Converts a base64 data URI to a binary Blob
 */
export function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1] || dataURI);
  const mimeString = (dataURI.split(',')[0].split(':')[1] || 'image/jpeg').split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

/**
 * Formats bytes into a human readable string (e.g. 98.4 KB, 1.2 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Generates a ZIP file containing all uploaded user DigiLocker documents
 */
export async function createDigiLockerZip(documents, targetKBPerFile) {
  const zip = new JSZip();
  const folder = zip.folder('VYNORA_DigiLocker_Vault') || zip;

  // Add README metadata index
  const indexContent = [
    '================================================================',
    '       VYNORA DIGITAL CITIZEN VAULT - EXPORTED DOSSIER         ',
    '================================================================',
    `Export Date: ${new Date().toLocaleString('en-IN')}`,
    `Total Stored Documents: ${documents.length}`,
    '',
    'Document Index:',
    ...documents.map((doc, idx) => `${idx + 1}. [${doc.category}] ${doc.name} (${formatBytes(doc.originalSizeBytes)}) - Verified: ${doc.verified ? 'YES' : 'PENDING'}`),
    '',
    'Note: These documents are formatted for direct upload to Indian Government recruitment (UPSC/SSC/State PSC) and welfare portals.',
    '================================================================'
  ].join('\n');

  folder.file('README_VAULT_INDEX.txt', indexContent);

  for (const doc of documents) {
    try {
      if (doc.fileType.startsWith('image/')) {
        let exportDataUrl = doc.dataUrl;
        if (targetKBPerFile && targetKBPerFile > 0) {
          const comp = await compressImageToTargetKB(doc.dataUrl, targetKBPerFile);
          exportDataUrl = comp.dataUrl;
        }
        const blob = dataURItoBlob(exportDataUrl);
        const ext = doc.fileType === 'image/png' ? 'png' : 'jpg';
        const cleanName = doc.name.replace(/[^a-zA-Z0-9_-]/g, '_');
        folder.file(`${cleanName}.${ext}`, blob);
      } else {
        // PDF or generic
        const blob = dataURItoBlob(doc.dataUrl);
        const cleanName = doc.name.replace(/[^a-zA-Z0-9_-]/g, '_');
        folder.file(`${cleanName}.pdf`, blob);
      }
    } catch {
      // fallback
      const blob = dataURItoBlob(doc.dataUrl);
      folder.file(`${doc.name}`, blob);
    }
  }

  return await zip.generateAsync({ type: 'blob' });
}

/**
 * Triggers browser download for a blob or dataUrl
 */
export function downloadFile(data, filename) {
  const url = typeof data === 'string' ? data : URL.createObjectURL(data);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (typeof data !== 'string') {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
