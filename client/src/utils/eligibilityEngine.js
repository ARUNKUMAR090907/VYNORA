export function parseIncomeToNumber(incomeVal) {
  if (typeof incomeVal === 'number') return incomeVal;
  if (!incomeVal) return 240000;
  const str = String(incomeVal).toLowerCase().replace(/,/g, '').trim();
  
  if (str.includes('lakh')) {
    const num = parseFloat(str.replace(/[^0-9.]/g, ''));
    if (!isNaN(num)) return Math.round(num * 100000);
  }
  if (str.includes('0-5') || str.includes('under 5')) return 250000;
  if (str.includes('5-10')) return 750000;
  if (str.includes('10-20')) return 1500000;
  if (str.includes('20+')) return 2200000;

  const rawNum = parseFloat(str.replace(/[^0-9.]/g, ''));
  return isNaN(rawNum) ? 240000 : rawNum;
}

export function evaluateSchemeEligibility(scheme, profile) {
  if (!profile) {
    return {
      scheme,
      score: 75,
      matchLevel: 'Moderately Eligible',
      matchedReasons: ['General Indian Citizen Eligibility'],
      unmetCriteria: ['Complete your profile for 100% exact scoring'],
      keyActionTip: 'Complete profile to see precise eligibility calculation.'
    };
  }

  // Normalized Profile Extraction
  const salary = parseIncomeToNumber(profile.salary || profile.annualIncome);
  const houseType = (profile.houseType || 'rental').toLowerCase();
  const rawStatus = (profile.employmentStatus || profile.occupationStatus || 'student').toLowerCase();
  const employmentStatus = rawStatus.includes('student') ? 'student' 
    : rawStatus.includes('self') || rawStatus.includes('business') ? 'working_self_employed'
    : rawStatus.includes('farm') ? 'farmer'
    : rawStatus.includes('artisan') ? 'artisan'
    : rawStatus.includes('unemployed') ? 'unemployed'
    : rawStatus.includes('govt') ? 'working_govt'
    : 'working_private';

  const category = profile.category || profile.community || 'General';
  const gender = (profile.gender || 'male').toLowerCase();
  const state = profile.state || 'Tamil Nadu';

  let totalWeight = 0;
  let earnedWeight = 0;
  const matchedReasons = [];
  const unmetCriteria = [];

  const { eligibilityCriteria } = scheme;

  // 1. Income Criterion (Weight: 30)
  if (eligibilityCriteria.maxIncome !== undefined) {
    totalWeight += 30;
    if (salary <= eligibilityCriteria.maxIncome) {
      earnedWeight += 30;
      matchedReasons.push(`Income ₹${salary.toLocaleString('en-IN')}/yr meets criteria (<= ₹${eligibilityCriteria.maxIncome.toLocaleString('en-IN')})`);
    } else {
      unmetCriteria.push(`Income ₹${salary.toLocaleString('en-IN')}/yr exceeds ceiling of ₹${eligibilityCriteria.maxIncome.toLocaleString('en-IN')}`);
    }
  }

  // 2. House Type Criterion (Weight: 25)
  if (eligibilityCriteria.houseTypes && eligibilityCriteria.houseTypes.length > 0) {
    totalWeight += 25;
    const lowerHouseTypes = eligibilityCriteria.houseTypes.map(h => h.toLowerCase());
    if (lowerHouseTypes.includes(houseType)) {
      earnedWeight += 25;
      matchedReasons.push(`Housing status (${houseType.toUpperCase()}) matches scheme target group`);
    } else {
      unmetCriteria.push(`Scheme targets ${eligibilityCriteria.houseTypes.join(', ')} houses; your status is ${houseType}`);
    }
  }

  // 3. Employment / Student Status (Weight: 25)
  if (eligibilityCriteria.employmentStatuses && eligibilityCriteria.employmentStatuses.length > 0) {
    totalWeight += 25;
    const lowerStatuses = eligibilityCriteria.employmentStatuses.map(s => s.toLowerCase());
    if (lowerStatuses.includes(employmentStatus) || lowerStatuses.includes(rawStatus)) {
      earnedWeight += 25;
      matchedReasons.push(`Status (${employmentStatus.replace('_', ' ').toUpperCase()}) aligns with beneficiary focus`);
    } else {
      unmetCriteria.push(`Scheme is targeted towards ${eligibilityCriteria.employmentStatuses.map(s => s.replace('_', ' ')).join(', ')}`);
    }
  }

  // 4. Social Category Criterion (Weight: 15)
  if (eligibilityCriteria.categories && eligibilityCriteria.categories.length > 0) {
    totalWeight += 15;
    if (eligibilityCriteria.categories.includes(category) || eligibilityCriteria.categories.includes('All') || eligibilityCriteria.categories.includes('General')) {
      earnedWeight += 15;
      matchedReasons.push(`Social category (${category}) eligible for reservation benefits`);
    } else {
      unmetCriteria.push(`Scheme specifically targets ${eligibilityCriteria.categories.join(', ')} applicants`);
    }
  }


  // 5. State / Regional Criterion (Weight: 10)
  if (eligibilityCriteria.states && eligibilityCriteria.states.length > 0) {
    totalWeight += 10;
    if (eligibilityCriteria.states.includes('All India') || eligibilityCriteria.states.includes(profile.state)) {
      earnedWeight += 10;
      matchedReasons.push(`Valid in your state/UT (${profile.state})`);
    } else {
      unmetCriteria.push(`Scheme active only in: ${eligibilityCriteria.states.join(', ')}`);
    }
  }

  // 6. Gender Criterion (Weight: 10)
  if (eligibilityCriteria.genders && eligibilityCriteria.genders.length > 0) {
    totalWeight += 10;
    if (eligibilityCriteria.genders.includes(profile.gender)) {
      earnedWeight += 10;
      matchedReasons.push(`Eligible for ${profile.gender} applicants`);
    } else {
      unmetCriteria.push(`Restricted to ${eligibilityCriteria.genders.join(', ')} applicants`);
    }
  }

  // Default base score calculation
  const calculatedScore = totalWeight > 0 ? Math.round((earnedWeight / totalWeight) * 100) : 88;
  const score = Math.max(30, Math.min(98, calculatedScore));

  let matchLevel = 'Moderately Eligible';
  if (score >= 80) matchLevel = 'Highly Eligible';
  else if (score < 60) matchLevel = 'Potential / Needs Review';

  let keyActionTip = 'Prepare required identity and income certificates for instant application.';
  if (unmetCriteria.length > 0) {
    keyActionTip = `Review: ${unmetCriteria[0]}`;
  } else if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
    keyActionTip = `Ensure ${scheme.requiredDocuments[0]} is ready in DigiLocker.`;
  }

  return {
    scheme,
    score,
    matchLevel,
    matchedReasons,
    unmetCriteria,
    keyActionTip
  };
}

