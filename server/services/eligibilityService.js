import User from '../models/User.js';
import Scheme from '../models/Scheme.js';

/**
 * Authoritative Eligibility Engine for VYNORA Citizen Platform
 * Computes deterministic, explainable eligibility match scores for a citizen against all verified schemes.
 */
export const calculateEligibility = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const schemes = await Scheme.find({});
    const results = [];

    for (const scheme of schemes) {
      const evaluation = evaluateCitizenScheme(user, scheme);
      results.push(evaluation);
    }

    // Sort descending by match score
    results.sort((a, b) => b.matchScore - a.matchScore);

    // Persist to user record in DB
    user.eligibilityCache = results;
    user.eligibilityLastUpdated = new Date();
    await user.save();

    return results;
  } catch (error) {
    throw new Error(`Eligibility calculation failed: ${error.message}`);
  }
};

/**
 * Pure evaluation function for a single scheme against a citizen profile
 */
export const evaluateCitizenScheme = (user, scheme) => {
  const criteria = scheme.eligibilityCriteria || {};
  let totalPoints = 0;
  let earnedPoints = 0;

  const matchedReasons = [];
  const unmatchedReasons = [];
  const needsVerification = [];

  const annualIncome = typeof user.annualIncome === 'number' ? user.annualIncome : parseInt(String(user.annualIncome || '0').replace(/\D/g, ''), 10) || 0;
  const houseType = (user.houseType || '').toLowerCase();
  const rawOccupation = (user.occupationStatus || '').toLowerCase();
  const community = user.community || '';
  const state = user.state || '';
  const gender = (user.gender || '').toLowerCase();

  // Normalize occupation mapping
  const normalizedOccupation = rawOccupation.includes('student')
    ? 'student'
    : rawOccupation.includes('self') || rawOccupation.includes('business')
    ? 'working_self_employed'
    : rawOccupation.includes('farm')
    ? 'farmer'
    : rawOccupation.includes('artisan')
    ? 'artisan'
    : rawOccupation.includes('unemployed')
    ? 'job_seeker'
    : rawOccupation.includes('govt')
    ? 'working_salaried'
    : 'working_salaried';

  // 1. Income Criteria (Weight: 30)
  if (criteria.maxIncome !== null && criteria.maxIncome !== undefined) {
    totalPoints += 30;
    if (annualIncome <= criteria.maxIncome) {
      earnedPoints += 30;
      matchedReasons.push(`Annual income ₹${annualIncome.toLocaleString('en-IN')} is within the scheme ceiling of ₹${criteria.maxIncome.toLocaleString('en-IN')}`);
    } else {
      unmatchedReasons.push(`Annual income ₹${annualIncome.toLocaleString('en-IN')} exceeds the scheme maximum of ₹${criteria.maxIncome.toLocaleString('en-IN')}`);
    }
  }

  // 2. State Scope Criteria (Weight: 20)
  if (criteria.states && criteria.states.length > 0) {
    totalPoints += 20;
    const isAllIndia = criteria.states.some((s) => s.toLowerCase().includes('all india'));
    const isStateMatch = criteria.states.some((s) => s.toLowerCase() === state.toLowerCase());

    if (isAllIndia || isStateMatch) {
      earnedPoints += 20;
      matchedReasons.push(isAllIndia ? 'Available to citizens nationwide across all Indian States/UTs' : `Available in your state: ${state}`);
    } else {
      unmatchedReasons.push(`Scheme is active in: ${criteria.states.join(', ')} (Profile state: ${state || 'Not specified'})`);
    }
  }

  // 3. Occupation / Employment Criteria (Weight: 20)
  if (criteria.employmentStatuses && criteria.employmentStatuses.length > 0) {
    totalPoints += 20;
    const lowerStatuses = criteria.employmentStatuses.map((s) => s.toLowerCase());
    const isMatch =
      lowerStatuses.includes(normalizedOccupation) ||
      lowerStatuses.includes(rawOccupation) ||
      lowerStatuses.includes('all');

    if (isMatch) {
      earnedPoints += 20;
      matchedReasons.push(`Occupation (${user.occupationStatus || 'Citizen'}) aligns with target beneficiaries`);
    } else {
      unmatchedReasons.push(`Targeted towards: ${criteria.employmentStatuses.map((s) => s.replace(/_/g, ' ')).join(', ')}`);
    }
  }

  // 4. Housing Criteria (Weight: 15)
  if (criteria.houseTypes && criteria.houseTypes.length > 0) {
    totalPoints += 15;
    const lowerHouseTypes = criteria.houseTypes.map((h) => h.toLowerCase());
    if (lowerHouseTypes.includes(houseType) || lowerHouseTypes.includes('all')) {
      earnedPoints += 15;
      matchedReasons.push(`Housing status (${user.houseType || 'Rental'}) meets scheme criteria`);
    } else {
      unmatchedReasons.push(`Scheme targets ${criteria.houseTypes.join(', ')} housing (Profile: ${user.houseType || 'Not specified'})`);
    }
  }

  // 5. Community / Reservation Criteria (Weight: 15)
  if (criteria.categories && criteria.categories.length > 0) {
    totalPoints += 15;
    const isCommunityMatch =
      criteria.categories.includes('All') ||
      criteria.categories.includes('General') ||
      criteria.categories.includes(community);

    if (isCommunityMatch) {
      earnedPoints += 15;
      matchedReasons.push(`Social community (${community || 'All'}) meets beneficiary category`);
    } else {
      unmatchedReasons.push(`Scheme specifically targets ${criteria.categories.join(', ')} categories`);
    }
  }

  // 6. Gender Criteria (Weight: 10)
  if (criteria.genders && criteria.genders.length > 0) {
    totalPoints += 10;
    const lowerGenders = criteria.genders.map((g) => g.toLowerCase());
    if (lowerGenders.includes(gender) || lowerGenders.includes('all')) {
      earnedPoints += 10;
      matchedReasons.push(`Applicable for ${user.gender || 'all'} citizens`);
    } else {
      unmatchedReasons.push(`Specifically restricted to ${criteria.genders.join(', ')} citizens`);
    }
  }

  // Calculate final score
  let matchScore = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 75;
  matchScore = Math.max(15, Math.min(98, matchScore));

  let status = 'Potentially Eligible';
  if (matchScore >= 80) status = 'Eligible';
  else if (matchScore >= 60) status = 'Likely Eligible';
  else if (matchScore < 40) status = 'Not Eligible';

  // Add required document verifications
  if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
    needsVerification.push(...scheme.requiredDocuments.slice(0, 3));
  } else {
    needsVerification.push('Aadhaar card e-KYC', 'Income Certificate');
  }

  return {
    schemeId: scheme._id,
    slug: scheme.slug,
    title: scheme.title,
    category: scheme.category,
    ministry: scheme.ministry,
    benefitAmount: scheme.benefitAmount,
    benefitType: scheme.benefitType,
    applicationUrl: scheme.applicationUrl,
    officialPortal: scheme.officialPortal,
    matchScore,
    status,
    matchedReasons,
    unmatchedReasons,
    needsVerification,
    disclaimer: 'VYNORA eligibility estimate. Final eligibility is determined by the respective government authority.',
  };
};

export const getSummaryFromCache = (user) => {
  const cache = user.eligibilityCache || [];
  return {
    totalSchemes: cache.length,
    eligible: cache.filter((s) => s.status === 'Eligible').length,
    likelyEligible: cache.filter((s) => s.status === 'Likely Eligible').length,
    potentiallyEligible: cache.filter((s) => s.status === 'Potentially Eligible').length,
    notEligible: cache.filter((s) => s.status === 'Not Eligible').length,
    lastUpdated: user.eligibilityLastUpdated,
  };
};
