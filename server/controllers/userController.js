import User from '../models/User.js';
import { calculateEligibility, getSummaryFromCache } from '../services/eligibilityService.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'Citizen profile not found.',
      });
    }

    const summary = getSummaryFromCache(user);

    return res.status(200).json({
      success: true,
      user: user.toSafeObject(),
      eligibilitySummary: summary,
    });
  } catch (error) {
    console.error('getProfile error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to retrieve citizen profile.',
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        code: 'USER_NOT_FOUND',
        message: 'Citizen not found.',
      });
    }

    const {
      name,
      annualIncome,
      houseType,
      gender,
      address,
      state,
      district,
      pincode,
      nativeLanguage,
      community,
      occupationStatus,
    } = req.body;

    // Sanitize and normalize fields
    if (name !== undefined) user.name = String(name).trim();
    if (annualIncome !== undefined) {
      const parsedIncome =
        typeof annualIncome === 'number'
          ? annualIncome
          : parseInt(String(annualIncome).replace(/\D/g, ''), 10) || 0;
      user.annualIncome = Math.max(0, parsedIncome);
    }
    if (houseType !== undefined) {
      const raw = String(houseType).trim();
      const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
      user.houseType = ['Owned', 'Rental', 'Kutcha', 'Homeless'].includes(capitalized) ? capitalized : 'Rental';
    }
    if (gender !== undefined) {
      const raw = String(gender).trim();
      const capitalized = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
      user.gender = ['Male', 'Female', 'Other'].includes(capitalized) ? capitalized : 'Male';
    }
    if (address !== undefined) user.address = String(address).trim();
    if (state !== undefined) user.state = String(state).trim();
    if (district !== undefined) user.district = String(district).trim();
    if (pincode !== undefined) user.pincode = String(pincode).trim();
    if (nativeLanguage !== undefined) {
      const validLangs = ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam'];
      user.nativeLanguage = validLangs.includes(nativeLanguage) ? nativeLanguage : 'English';
    }
    if (community !== undefined) {
      const validComms = ['General', 'OBC', 'SC', 'ST', 'EWS'];
      user.community = validComms.includes(community) ? community : 'General';
    }
    if (occupationStatus !== undefined) {
      const validOccs = ['Student', 'Working Professional', 'Self-employed', 'Farmer', 'Artisan', 'Unemployed'];
      user.occupationStatus = validOccs.includes(occupationStatus) ? occupationStatus : 'Student';
    }

    // Check completion status authoritatively on the server
    const isCompleted = user.checkProfileCompletion();
    await user.save();

    // Recalculate eligibility if complete
    let eligibilityResults = [];
    if (isCompleted) {
      try {
        eligibilityResults = await calculateEligibility(user._id);
        user.eligibilityCache = eligibilityResults;
        user.eligibilityLastUpdated = new Date();
      } catch (eligErr) {
        console.warn('Eligibility calculation notice:', eligErr.message);
      }
    }

    const summary = getSummaryFromCache(user);

    return res.status(200).json({
      success: true,
      message: 'Citizen profile saved and eligibility calculated successfully.',
      user: user.toSafeObject(),
      eligibilitySummary: summary,
      topSchemes: eligibilityResults.slice(0, 5),
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      message: 'Failed to update profile. Please try again.',
    });
  }
};
