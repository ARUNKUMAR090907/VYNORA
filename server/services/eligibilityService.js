import User from '../models/User.js';
import Scheme from '../models/Scheme.js';

export const calculateEligibility = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const schemes = await Scheme.find();
    const results = [];

    for (const scheme of schemes) {
      const score = calculateSchemeScore(user, scheme);
      if (score > 0) {
        results.push({
          schemeId: scheme._id,
          title: scheme.title,
          score,
          status: getEligibilityStatus(score),
          matchedCriteria: getMatchedCriteria(user, scheme),
          unmatchedCriteria: getUnmatchedCriteria(user, scheme),
        });
      }
    }

    // Sort by score
    results.sort((a, b) => b.score - a.score);

    // Cache results
    user.eligibilityCache = results;
    user.eligibilityLastUpdated = new Date();
    await user.save();

    return results;
  } catch (error) {
    throw new Error(`Eligibility calculation failed: ${error.message}`);
  }
};

const calculateSchemeScore = (user, scheme) => {
  let score = 0;

  // Income matching
  if (scheme.incomeCriteria && user.annualIncome) {
    const income = parseInt(user.annualIncome.replace(/\D/g, ''));
    if (income >= (scheme.incomeCriteria.min || 0) && income <= (scheme.incomeCriteria.max || Infinity)) {
      score += 25;
    }
  }

  // State matching
  if (scheme.states && scheme.states.length > 0 && user.state) {
    if (scheme.states.includes(user.state)) {
      score += 20;
    }
  }

  // Gender matching
  if (scheme.genderCriteria && scheme.genderCriteria.length > 0 && user.gender) {
    if (scheme.genderCriteria.includes(user.gender)) {
      score += 15;
    }
  }

  // Community matching
  if (scheme.communityCriteria && scheme.communityCriteria.length > 0 && user.community) {
    if (scheme.communityCriteria.includes(user.community)) {
      score += 15;
    }
  }

  // Occupation matching
  if (scheme.occupationCriteria && scheme.occupationCriteria.length > 0 && user.occupationStatus) {
    if (scheme.occupationCriteria.includes(user.occupationStatus)) {
      score += 15;
    }
  }

  // House type matching
  if (scheme.houseCriteria && scheme.houseCriteria.length > 0 && user.houseType) {
    if (scheme.houseCriteria.includes(user.houseType)) {
      score += 10;
    }
  }

  return score;
};

const getEligibilityStatus = (score) => {
  if (score >= 80) return 'Highly Eligible';
  if (score >= 60) return 'Likely Eligible';
  if (score >= 40) return 'Partially Eligible';
  return 'Check Requirements';
};

const getMatchedCriteria = (user, scheme) => {
  const matched = [];

  if (scheme.incomeCriteria && user.annualIncome) {
    const income = parseInt(user.annualIncome.replace(/\D/g, ''));
    if (income >= (scheme.incomeCriteria.min || 0) && income <= (scheme.incomeCriteria.max || Infinity)) {
      matched.push('Income requirement matched');
    }
  }

  if (scheme.states && scheme.states.length > 0 && user.state) {
    if (scheme.states.includes(user.state)) {
      matched.push('State requirement matched');
    }
  }

  if (scheme.genderCriteria && scheme.genderCriteria.length > 0 && user.gender) {
    if (scheme.genderCriteria.includes(user.gender)) {
      matched.push(`${user.gender} eligibility matched`);
    }
  }

  if (scheme.communityCriteria && scheme.communityCriteria.length > 0 && user.community) {
    if (scheme.communityCriteria.includes(user.community)) {
      matched.push('Community requirement matched');
    }
  }

  if (scheme.occupationCriteria && scheme.occupationCriteria.length > 0 && user.occupationStatus) {
    if (scheme.occupationCriteria.includes(user.occupationStatus)) {
      matched.push(`${user.occupationStatus} eligibility matched`);
    }
  }

  return matched;
};

const getUnmatchedCriteria = (user, scheme) => {
  const unmatched = [];

  if (scheme.incomeCriteria && user.annualIncome) {
    const income = parseInt(user.annualIncome.replace(/\D/g, ''));
    if (!(income >= (scheme.incomeCriteria.min || 0) && income <= (scheme.incomeCriteria.max || Infinity))) {
      unmatched.push(`Income requirement not met (Max: ${scheme.incomeCriteria.max})`);
    }
  }

  if (scheme.states && scheme.states.length > 0 && user.state) {
    if (!scheme.states.includes(user.state)) {
      unmatched.push(`Scheme not available in ${user.state}`);
    }
  }

  return unmatched;
};
