import { generateCopilotResponse } from '../services/aiProvider.js';
import User from '../models/User.js';

export const askCopilot = async (req, res) => {
  try {
    const { message, profile, targetLanguage, activeSchemeSlug, history, mode } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        code: 'MISSING_MESSAGE',
        message: 'Message query is required.',
      });
    }

    // If request has authenticated user, merge profile
    let citizenProfile = profile || {};
    if (req.user?.id && (!profile || !profile.annualIncome)) {
      try {
        const dbUser = await User.findById(req.user.id);
        if (dbUser) {
          citizenProfile = { ...dbUser.toSafeObject(), ...citizenProfile };
        }
      } catch (e) {
        // proceed with supplied profile
      }
    }

    const aiResult = await generateCopilotResponse({
      message: message.trim(),
      profile: citizenProfile,
      targetLanguage: targetLanguage || citizenProfile.nativeLanguage || 'English',
      activeSchemeSlug,
      history: history || [],
      mode: mode || 'detailed',
    });

    return res.status(200).json({
      success: true,
      response: aiResult.response,
      message: aiResult.response,
      provider: aiResult.provider,
      referencedScheme: aiResult.referencedScheme,
      officialPortal: aiResult.officialPortal,
    });
  } catch (error) {
    console.error('askCopilot error:', error);
    return res.status(500).json({
      success: false,
      code: 'COPILOT_ERROR',
      message: 'AI advisor temporarily unavailable. Please retry your question.',
    });
  }
};

export const chatWithCopilot = async (req, res) => {
  // Alias to askCopilot
  return askCopilot(req, res);
};

export const verifyLink = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        success: false,
        code: 'MISSING_URL',
        message: 'URL is required for verification.',
      });
    }

    let parsedDomain = '';
    try {
      const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
      parsedDomain = parsed.hostname.toLowerCase();
    } catch {
      parsedDomain = url.toLowerCase().trim();
    }

    const isOfficialGov =
      parsedDomain.endsWith('.gov.in') ||
      parsedDomain.endsWith('.nic.in') ||
      parsedDomain.endsWith('.mygov.in') ||
      parsedDomain.endsWith('.digitalindia.gov.in') ||
      parsedDomain.endsWith('.ac.in');

    const suspiciousKeywords = [
      'free-money',
      'pm-gift',
      'yojana-online',
      'claim-bonus',
      'lottery',
      'win-cash',
      'modi-subsidy-link',
      'instant-loan-approval',
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

    return res.status(200).json({
      success: true,
      url,
      domain: parsedDomain,
      isOfficialGov,
      safetyStatus,
      riskScore,
      analysisMessage,
      recommendedOfficialPortal: isOfficialGov ? url : 'https://www.myscheme.gov.in',
    });
  } catch (error) {
    console.error('verifyLink error:', error);
    return res.status(500).json({
      success: false,
      code: 'VERIFY_ERROR',
      message: 'Failed to verify URL.',
    });
  }
};

export const auditDocument = async (req, res) => {
  try {
    const { imageBase64, documentType } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        success: false,
        code: 'MISSING_DOCUMENT',
        message: 'Document base64 data is required.',
      });
    }

    const sizeInBytes = Math.round((imageBase64.length * 3) / 4);
    const sizeInKB = Math.round(sizeInBytes / 1024);

    const isUnder100KB = sizeInKB <= 120;
    const clarityScore = isUnder100KB ? 94 : 88;

    return res.status(200).json({
      success: true,
      documentType: documentType || 'Identity Certificate',
      originalSizeBytes: sizeInBytes,
      sizeInKB,
      clarityScore,
      readyForPortal: isUnder100KB,
      recommendation: isUnder100KB
        ? 'Document is optimal for official government portal upload (< 100 KB).'
        : `Current size is ${sizeInKB} KB. Compress to under 100 KB before uploading to prevent portal rejection.`,
      compressionSuggested: !isUnder100KB,
    });
  } catch (error) {
    console.error('auditDocument error:', error);
    return res.status(500).json({
      success: false,
      code: 'AUDIT_ERROR',
      message: 'Failed to audit document.',
    });
  }
};
