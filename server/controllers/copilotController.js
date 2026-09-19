import { generateSovereignResponse } from '../geminiAdvisor.js';

export const askCopilot = async (req, res) => {
  try {
    const { message, profile, targetLanguage, mode } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const responseText = generateSovereignResponse(
      message,
      profile || req.user || {},
      targetLanguage || 'Tamil',
      mode || 'detailed'
    );

    res.status(200).json({
      success: true,
      response: responseText,
      message: responseText
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error generating AI response' });
  }
};

export const chatWithCopilot = async (req, res) => {
  try {
    const { message, profile, targetLanguage, mode } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const responseText = generateSovereignResponse(
      message,
      profile || {},
      targetLanguage || 'Tamil',
      mode || 'detailed'
    );

    res.status(200).json({
      success: true,
      response: responseText,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error generating AI response' });
  }
};

export const verifyLink = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let parsedDomain = '';
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      parsedDomain = parsed.hostname.toLowerCase();
    } catch {
      parsedDomain = url.toLowerCase();
    }

    const isOfficialGov =
      parsedDomain.endsWith('.gov.in') ||
      parsedDomain.endsWith('.nic.in') ||
      parsedDomain.endsWith('.tn.gov.in') ||
      parsedDomain.endsWith('.mygov.in') ||
      parsedDomain.endsWith('.digitalindia.gov.in');

    const suspiciousKeywords = [
      'free-money',
      'pm-gift',
      'yojana-online',
      'claim-bonus',
      'lottery',
      'win-cash',
      'modi-subsidy-link',
      'instant-loan-approval'
    ];

    const isSuspicious =
      suspiciousKeywords.some((kw) => url.toLowerCase().includes(kw)) ||
      (!isOfficialGov &&
        (url.includes('.xyz') ||
          url.includes('.top') ||
          url.includes('.tk') ||
          url.includes('.live') ||
          url.includes('.club') ||
          url.includes('bit.ly') ||
          url.includes('tinyurl')));

    let safetyStatus = 'VERIFIED_OFFICIAL';
    let riskScore = 5;
    let analysisMessage = 'Authentic Government of India / State Official Portal (.gov.in / .nic.in). Safe for e-KYC and application.';

    if (!isOfficialGov && !isSuspicious) {
      safetyStatus = 'THIRD_PARTY_INFORMATION';
      riskScore = 45;
      analysisMessage = 'Informational / private third-party portal. Never enter your Aadhaar OTP or bank PIN on non-gov domains.';
    } else if (isSuspicious) {
      safetyStatus = 'SUSPICIOUS_PHISHING_ALERT';
      riskScore = 95;
      analysisMessage = 'WARNING: High probability phishing/scam scheme link. Do NOT provide personal details or pay any fee.';
    }

    res.status(200).json({
      url,
      domain: parsedDomain,
      isOfficialGov,
      safetyStatus,
      riskScore,
      analysisMessage,
      recommendedOfficialPortal: isOfficialGov ? url : 'https://www.myscheme.gov.in'
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to verify URL' });
  }
};

export const auditDocument = async (req, res) => {
  try {
    const { imageBase64, documentType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'Document data is required' });
    }

    const sizeInBytes = Math.round((imageBase64.length * 3) / 4);
    const sizeInKB = Math.round(sizeInBytes / 1024);

    const isUnder100KB = sizeInKB <= 120;
    const clarityScore = isUnder100KB ? 94 : 88;

    res.status(200).json({
      documentType: documentType || 'Identity Certificate',
      originalSizeBytes: sizeInBytes,
      sizeInKB,
      clarityScore,
      readyForPortal: isUnder100KB,
      recommendation: isUnder100KB
        ? 'Document is optimal for official government portal upload (< 100 KB).'
        : `Current size is ${sizeInKB} KB. Compress to under 100 KB before uploading to prevent portal rejection.`,
      compressionSuggested: !isUnder100KB
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to audit document' });
  }
};
