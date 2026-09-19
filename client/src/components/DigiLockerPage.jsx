import React, { useState } from 'react';
import { 
  FolderLock, 
  Upload, 
  Download, 
  Trash2, 
  Eye, 
  FileText, 
  CheckCircle2, 
  Sliders, 
  Archive, 
  Plus, 
  X, 
  Check 
} from 'lucide-react';
import { 
  compressImageToTargetKB, 
  formatBytes, 
  downloadFile, 
  createDigiLockerZip 
} from '../utils/documentCompressor';

export const DigiLockerPage = ({
  documents,
  onAddDocument,
  onDeleteDocument
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [targetSizeKB, setTargetSizeKB] = useState(100);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isUploadingModalOpen, setIsUploadingModalOpen] = useState(false);
  const [isPackingZip, setIsPackingZip] = useState(false);

  // Upload Form State
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState('Aadhaar Card');
  const [docFilePayload, setDocFilePayload] = useState(null);

  const categories = [
    'All',
    'Aadhaar Card',
    'PAN Card',
    'Academic Marksheet',
    'Degree / Diploma',
    'Income Certificate',
    'Caste Certificate',
    'Ration Card',
    'Driving License',
    'Other'
  ];

  const filteredDocuments = documents.filter((doc) => {
    return selectedCategory === 'All' || doc.category === selectedCategory;
  });

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('image/')
      ? file.type
      : 'application/pdf';

    setDocName(file.name.replace(/\.[^/.]+$/, ''));

    const reader = new FileReader();
    reader.onload = () => {
      setDocFilePayload({
        dataUrl: reader.result,
        fileType,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSaveUpload = () => {
    if (!docFilePayload) return;

    const newDoc = {
      id: `digi-${Date.now()}`,
      name: docName.trim() || 'Uploaded_Document',
      category: docCategory,
      fileType: docFilePayload.fileType,
      originalSizeBytes: docFilePayload.size,
      dataUrl: docFilePayload.dataUrl,
      uploadedAt: new Date().toLocaleDateString('en-IN'),
      verified: true,
      notes: 'Stored in Sovereign DigiLocker Vault',
    };

    onAddDocument(newDoc);
    setIsUploadingModalOpen(false);
    setDocFilePayload(null);
    setDocName('');
  };

  // Download single document at target size (default 100 KB)
  const handleDownloadSingle = async (doc) => {
    if (doc.fileType.startsWith('image/')) {
      const comp = await compressImageToTargetKB(doc.dataUrl, targetSizeKB);
      const ext = doc.fileType === 'image/png' ? 'png' : 'jpg';
      downloadFile(comp.blob, `${doc.name}_${targetSizeKB}KB.${ext}`);
    } else {
      // PDF document
      downloadFile(doc.dataUrl, `${doc.name}.pdf`);
    }
  };

  // Pack entire vault into a single ZIP archive
  const handleDownloadVaultZip = async () => {
    if (documents.length === 0) return;
    setIsPackingZip(true);
    try {
      const zipBlob = await createDigiLockerZip(documents, targetSizeKB);
      downloadFile(zipBlob, `VYNORA_DigiLocker_Vault_${targetSizeKB}KB_Archive.zip`);
    } catch (err) {
      console.error('ZIP packaging failed:', err);
    } finally {
      setIsPackingZip(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 mb-1.5">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
              <FolderLock className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
              Sovereign Citizen DigiLocker Vault
            </span>
            <span className="text-xs text-slate-500 font-medium">100KB Government Standard</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            Digital Document Vault & Multi-Size Exporter
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
            Store Aadhaar, PAN, marksheets, and caste certificates in image or PDF format. Re-download any document at your required portal file size (Default: <strong>100 KB</strong>) or export the complete dossier as a packed ZIP archive.
          </p>
        </div>

        {/* Global Vault Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsUploadingModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center space-x-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>

          <button
            disabled={documents.length === 0 || isPackingZip}
            onClick={handleDownloadVaultZip}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs flex items-center space-x-2 transition-all disabled:opacity-50 shadow-xs cursor-pointer"
          >
            <Archive className="w-4 h-4 text-green-600" />
            <span>{isPackingZip ? 'Packing ZIP...' : 'Export Complete ZIP'}</span>
          </button>
        </div>
      </div>

      {/* Target Size Selector Control Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Default Download & Export Size Target
            </div>
            <div className="text-[11px] text-slate-500">
              UPSC, SSC & State Government portals enforce 100 KB max limit.
            </div>
          </div>
        </div>

        {/* Presets & Active Slider */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: '50 KB', kb: 50 },
            { label: '100 KB (Govt Default)', kb: 100 },
            { label: '200 KB', kb: 200 },
            { label: '500 KB', kb: 500 },
          ].map((preset) => (
            <button
              key={preset.kb}
              onClick={() => setTargetSizeKB(preset.kb)}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                targetSizeKB === preset.kb
                  ? 'bg-green-600 text-white border-green-600 font-bold shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-green-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 border border-slate-200 shadow-xs'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => {
            const isImage = doc.fileType.startsWith('image/');

            return (
              <div
                key={doc.id}
                className="rounded-2xl bg-white border border-slate-200 hover:border-green-300 hover:shadow-md p-5 shadow-xs flex flex-col justify-between transition-all"
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 truncate">
                      {doc.category}
                    </span>

                    <span className="flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Verified
                    </span>
                  </div>

                  {/* Thumbnail / File Icon Preview */}
                  <div 
                    onClick={() => setPreviewDoc(doc)}
                    className="h-36 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden mb-3 cursor-pointer group relative"
                  >
                    {isImage ? (
                      <img
                        src={doc.dataUrl}
                        alt={doc.name}
                        className="h-full w-full object-contain p-2 group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <FileText className="w-10 h-10 text-green-600 mx-auto mb-1" />
                        <span className="text-[11px] text-slate-500 font-mono">PDF Document</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="px-2.5 py-1 rounded-lg bg-white text-slate-900 text-xs font-semibold flex items-center space-x-1 shadow-xs">
                        <Eye className="w-3 h-3" />
                        <span>Preview</span>
                      </span>
                    </div>
                  </div>

                  {/* Title & Size */}
                  <h3 className="text-sm font-bold text-slate-900 tracking-tight truncate mb-1">
                    {doc.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span>Stored Size: <strong className="text-slate-700">{formatBytes(doc.originalSizeBytes)}</strong></span>
                    <span>{doc.uploadedAt}</span>
                  </div>
                </div>

                {/* Actions: Download at 100KB / Delete */}
                <div className="flex items-center space-x-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleDownloadSingle(doc)}
                    className="flex-1 py-2 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download ({targetSizeKB} KB)</span>
                  </button>

                  <button
                    onClick={() => onDeleteDocument(doc.id)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                    title="Delete from Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <FolderLock className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Documents in This Category</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Upload your Aadhaar, PAN card, or college marksheets to access instant 100 KB downloads.
          </p>
          <button
            onClick={() => setIsUploadingModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs inline-flex items-center space-x-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-800 space-y-4">
            
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">Add Document to DigiLocker</h3>
                <p className="text-xs text-slate-500">Stores image (JPEG/PNG) or PDF documents securely.</p>
              </div>
              <button
                onClick={() => setIsUploadingModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1 uppercase tracking-wider">
                  Document Category
                </label>
                <select
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                >
                  {categories.filter(c => c !== 'All').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 uppercase tracking-wider">
                  Document Label / Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aadhaar_Card_Self / Degree_Marksheet_Final"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                />
              </div>

              {/* File Input */}
              <div className="border-2 border-dashed border-slate-200 hover:border-green-500 rounded-xl p-4 text-center bg-slate-50/50">
                <input
                  type="file"
                  id="digilocker-upload-input"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <label
                  htmlFor="digilocker-upload-input"
                  className="cursor-pointer block text-slate-600 hover:text-slate-900"
                >
                  {docFilePayload ? (
                    <div className="text-emerald-700 font-semibold flex items-center justify-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>File Selected ({formatBytes(docFilePayload.size)})</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <span className="font-semibold underline">Choose JPEG, PNG or PDF</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsUploadingModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!docFilePayload}
                onClick={handleSaveUpload}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold flex items-center space-x-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save to Vault</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-xl p-6 text-slate-800 space-y-4 max-h-[90vh] flex flex-col">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">{previewDoc.name}</h3>
                <span className="text-xs text-slate-500">{previewDoc.category} • {formatBytes(previewDoc.originalSizeBytes)}</span>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto bg-slate-50 rounded-xl p-3 flex items-center justify-center border border-slate-200">
              {previewDoc.fileType.startsWith('image/') ? (
                <img
                  src={previewDoc.dataUrl}
                  alt={previewDoc.name}
                  className="max-h-[60vh] object-contain rounded-lg"
                />
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-800">PDF Document Ready</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <span className="text-xs text-slate-500">Target Size: <strong className="text-slate-800">{targetSizeKB} KB</strong></span>
              <button
                onClick={() => {
                  handleDownloadSingle(previewDoc);
                  setPreviewDoc(null);
                }}
                className="px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download ({targetSizeKB} KB)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
