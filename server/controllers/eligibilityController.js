import User from '../models/User.js';
import { calculateEligibility, getSummaryFromCache } from '../services/eligibilityService.js';

export const getEligibleSchemes = async (req, res) => {
  try {
    const results = await calculateEligibility(req.user.id);
    return res.status(200).json({
      success: true,
      count: results.length,
      schemes: results,
    });
  } catch (error) {
    console.error('getEligibleSchemes error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to calculate eligible schemes.',
    });
  }
};

export const getEligibilitySummary = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'Citizen not found.',
      });
    }

    if (!user.eligibilityCache || user.eligibilityCache.length === 0) {
      // Calculate once if empty
      const results = await calculateEligibility(user._id);
      user.eligibilityCache = results;
    }

    const summary = getSummaryFromCache(user);

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error('getEligibilitySummary error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to retrieve eligibility summary.',
    });
  }
};
