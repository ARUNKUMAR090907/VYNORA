import { calculateEligibility } from '../services/eligibilityService.js';
import User from '../models/User.js';

export const getEligibleSchemes = async (req, res) => {
  try {
    const results = await calculateEligibility(req.user.id);
    res.status(200).json({ success: true, schemes: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEligibilitySummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user || !user.eligibilityCache) {
      return res.status(404).json({ error: 'No eligibility data found. Please calculate eligibility first.' });
    }

    const summary = {
      totalSchemes: user.eligibilityCache.length,
      highlyEligible: user.eligibilityCache.filter(s => s.status === 'Highly Eligible').length,
      likelyEligible: user.eligibilityCache.filter(s => s.status === 'Likely Eligible').length,
      partiallyEligible: user.eligibilityCache.filter(s => s.status === 'Partially Eligible').length,
      lastUpdated: user.eligibilityLastUpdated,
    };

    res.status(200).json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
