/**
 * ============================================================================
 * VYNORA CITIZEN PORTAL - OFFICIAL SCHEMES DATABASE (50+ SCHEMES)
 * ============================================================================
 * 
 * HOW TO ADD A NEW SCHEME TO THIS DATABASE:
 * -----------------------------------------
 * Copy the template block below and append it to the SCHEMES_DATABASE array.
 * 
 * TEMPLATE:
 * {
 *   id: 'unique-scheme-id',
 *   title: 'Official Scheme Title (e.g. PM Awas Yojana 2.0)',
 *   shortDescription: 'One or two sentence summary of the core welfare benefit.',
 *   category: 'Housing' | 'Healthcare' | 'Energy & Tech' | 'Financial & MSME' | 'Education' | 'Agriculture' | 'Women & Child' | 'Social Security' | 'Employment & Skilling' | 'Handicrafts & Artisans',
 *   ministry: 'Official Ministry Name',
 *   benefitAmount: '₹X Lakh / ₹Y per year Direct Subsidy/Grant',
 *   benefitType: 'Direct Benefit Transfer / Credit Linked Subsidy / Cashless Hospitalization / Collateral-Free Loan',
 *   targetAudience: 'Description of eligible citizen profile',
 *   eligibilityCriteria: {
 *     maxIncome: 900000, // In INR per year (optional)
 *     houseTypes: ['rental', 'owned', 'ancestral', 'other'], // (optional)
 *     employmentStatuses: ['student', 'working_salaried', 'working_self_employed', 'job_seeker', 'farmer', 'homemaker'], // (optional)
 *     categories: ['General', 'OBC', 'SC', 'ST', 'EWS'], // (optional)
 *     states: ['All India'], // or specific state names
 *     minAge: 18, // (optional)
 *     maxAge: 40  // (optional)
 *   },
 *   requiredDocuments: [
 *     'Aadhaar Card (e-KYC verified)',
 *     'Income Certificate',
 *     'Bank Passbook seeded with NPCI/DBT'
 *   ],
 *   applicationUrl: 'https://officialportal.gov.in',
 *   officialPortal: 'officialportal.gov.in',
 *   tags: ['Tag1', 'Tag2', 'Tag3']
 * }
 * ============================================================================
 */

export const SCHEMES_DATABASE = [
  // --------------------------------------------------------------------------
  // 1. HOUSING & INFRASTRUCTURE
  // --------------------------------------------------------------------------
  {
    id: 'pm-awas-yojana-urban',
    title: 'Pradhan Mantri Awas Yojana (PMAY 2.0 - Urban)',
    shortDescription: 'Pucca housing assistance with interest subsidy up to ₹2.67 Lakh for homeless or rental urban families.',
    category: 'Housing',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)',
    benefitAmount: '₹1.5 Lakh to ₹2.67 Lakh Direct Subsidy',
    benefitType: 'Direct Benefit Transfer / Credit Linked Subsidy (CLSS)',
    targetAudience: 'Families living in rental or kutcha houses with annual income below ₹9 Lakh',
    eligibilityCriteria: {
      maxIncome: 900000,
      houseTypes: ['rental', 'ancestral', 'other'],
      employmentStatuses: ['student', 'working_salaried', 'working_self_employed', 'job_seeker', 'homemaker', 'farmer'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Income Certificate from Tehsildar / Form 16 / ITR',
      'Proof of Current Residence / Rent Agreement',
      'Bank Account passbook linked to Aadhaar (NPCI)',
      'Affidavit of not owning pucca house in India'
    ],
    applicationUrl: 'https://pmaymis.gov.in',
    officialPortal: 'pmaymis.gov.in',
    tags: ['Housing', 'Subsidy', 'PMAY', 'Home Loan', 'EWS/LIG/MIG', 'Urban']
  },
  {
    id: 'pm-awas-yojana-gramin',
    title: 'Pradhan Mantri Awas Yojana (Gramin - PMAY-G)',
    shortDescription: 'Direct financial assistance of ₹1.20 to ₹1.30 Lakh + 90 days MGNREGA wages for building pucca houses in rural areas.',
    category: 'Housing',
    ministry: 'Ministry of Rural Development (MoRD)',
    benefitAmount: '₹1.20 Lakh to ₹1.57 Lakh Financial Grant',
    benefitType: 'Direct Benefit Transfer (DBT)',
    targetAudience: 'Rural households without shelter or living in 1-2 room kutcha houses in SECC/Awaas+ database',
    eligibilityCriteria: {
      maxIncome: 300000,
      houseTypes: ['rental', 'ancestral', 'other'],
      employmentStatuses: ['farmer', 'working_self_employed', 'job_seeker', 'homemaker'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card of Applicant & Family',
      'MGNREGA Job Card',
      'Bank Account Passbook (Aadhaar linked)',
      'Gram Panchayat Survey Reference'
    ],
    applicationUrl: 'https://pmayg.nic.in',
    officialPortal: 'pmayg.nic.in',
    tags: ['Housing', 'Rural', 'PMAY-G', 'Gramin', 'Kutcha House', 'Grant']
  },
  {
    id: 'svamitva-property-card-scheme',
    title: 'SVAMITVA Scheme - Rural Property Legal Cards',
    shortDescription: 'Official Drone mapping and legal Property Ownership Cards to unlock bank loans against village residential property.',
    category: 'Housing',
    ministry: 'Ministry of Panchayati Raj',
    benefitAmount: 'Legal Property Card + Bank Loan Facility',
    benefitType: 'Official Land Title & Asset Monetization',
    targetAudience: 'Rural residents owning homes in populated (Abadi) village areas',
    eligibilityCriteria: {
      houseTypes: ['owned', 'ancestral'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Existing Village House Possession Proof / Electricity Bill',
      'Active Mobile Number'
    ],
    applicationUrl: 'https://svamitva.nic.in',
    officialPortal: 'svamitva.nic.in',
    tags: ['Property Card', 'Rural Land', 'Svamitva', 'Drone Survey', 'Abadi']
  },

  // --------------------------------------------------------------------------
  // 2. HEALTHCARE & WELLNESS
  // --------------------------------------------------------------------------
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)',
    shortDescription: 'Free cashless health insurance cover of ₹5 Lakh per family per year for secondary & tertiary hospital treatments.',
    category: 'Healthcare',
    ministry: 'Ministry of Health and Family Welfare (MoHFW) & NHA',
    benefitAmount: '₹5,00,000 / family / year',
    benefitType: 'Cashless Hospitalization Insurance',
    targetAudience: 'Economically vulnerable families, informal workers, and senior citizens aged 70+',
    eligibilityCriteria: {
      maxIncome: 600000,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card (biometric/OTP e-KYC)',
      'Ration Card / NFSA BPL Card / State Family ID',
      'Active Mobile Number'
    ],
    applicationUrl: 'https://mera.pmjay.gov.in',
    officialPortal: 'mera.pmjay.gov.in',
    tags: ['Health', 'Hospital', 'Insurance', 'Cashless', 'Ayushman Card', 'PMJAY']
  },
  {
    id: 'pm-jeevan-jyoti-bima-pmjjby',
    title: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
    shortDescription: '₹2,00,000 Life Insurance cover on death due to any cause for an affordable annual premium of just ₹436/year.',
    category: 'Healthcare',
    ministry: 'Ministry of Finance (Department of Financial Services)',
    benefitAmount: '₹2,00,000 Life Insurance Cover',
    benefitType: 'Sovereign Life Insurance Policy',
    targetAudience: 'All savings bank account holders aged 18 to 50 years',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 50,
      states: ['All India']
    },
    requiredDocuments: [
      'Savings Bank / Post Office Account Passbook',
      'Aadhaar Card',
      'Nominee Details & Auto-Debit Consent'
    ],
    applicationUrl: 'https://www.jansuraksha.gov.in',
    officialPortal: 'jansuraksha.gov.in',
    tags: ['Life Insurance', 'PMJJBY', 'Social Security', 'Jansuraksha', 'Death Cover']
  },
  {
    id: 'pm-suraksha-bima-pmsby',
    title: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
    shortDescription: '₹2,00,000 Accidental Death / Permanent Disability insurance cover for a nominal premium of only ₹20 per year.',
    category: 'Healthcare',
    ministry: 'Ministry of Finance (Department of Financial Services)',
    benefitAmount: '₹2,00,000 Accidental Insurance Cover',
    benefitType: 'Sovereign Accidental Death & Disability Cover',
    targetAudience: 'All Indian citizens aged 18 to 70 years with active bank account',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 70,
      states: ['All India']
    },
    requiredDocuments: [
      'Savings Bank Account',
      'Aadhaar Card',
      'Nominee details'
    ],
    applicationUrl: 'https://www.jansuraksha.gov.in',
    officialPortal: 'jansuraksha.gov.in',
    tags: ['Accident Insurance', 'PMSBY', '20 Rupee Bima', 'Disability Cover']
  },
  {
    id: 'janani-suraksha-yojana-jsy',
    title: 'Janani Suraksha Yojana (JSY) Maternity Scheme',
    shortDescription: 'Cash assistance of ₹1,400 (Rural) and ₹1,000 (Urban) + free hospital delivery & nutrition for pregnant women.',
    category: 'Healthcare',
    ministry: 'Ministry of Health and Family Welfare (MoHFW)',
    benefitAmount: '₹1,000 to ₹1,400 Cash Grant + Free Delivery',
    benefitType: 'Direct Benefit Transfer (DBT)',
    targetAudience: 'Pregnant women delivering at government or accredited private healthcare facilities',
    eligibilityCriteria: {
      maxIncome: 500000,
      genders: ['female'],
      states: ['All India']
    },
    requiredDocuments: [
      'Mother and Child Protection (MCP) Card',
      'Aadhaar Card of pregnant mother',
      'Bank Account Passbook (Aadhaar linked)'
    ],
    applicationUrl: 'https://nhm.gov.in',
    officialPortal: 'nhm.gov.in',
    tags: ['Maternity', 'Pregnant Women', 'Hospital Delivery', 'JSY', 'Healthcare']
  },

  // --------------------------------------------------------------------------
  // 3. CLEAN ENERGY & SUSTAINABILITY
  // --------------------------------------------------------------------------
  {
    id: 'pm-surya-ghar-muft-bijli',
    title: 'PM Surya Ghar: Muft Bijli Yojana',
    shortDescription: 'Up to ₹78,000 central government subsidy for installing rooftop solar plant, giving up to 300 free units of electricity every month.',
    category: 'Energy & Tech',
    ministry: 'Ministry of New and Renewable Energy (MNRE)',
    benefitAmount: '₹30,000 to ₹78,000 Capital Subsidy + 300 Units/mo Free',
    benefitType: 'Direct Subsidy into Bank Account',
    targetAudience: 'Homeowners with suitable roof space and active domestic electricity connection',
    eligibilityCriteria: {
      houseTypes: ['owned', 'ancestral'],
      states: ['All India']
    },
    requiredDocuments: [
      'Electricity Bill (latest within 6 months)',
      'Proof of House Ownership / Property Tax Receipt',
      'Aadhaar Card',
      'Bank Account Passbook / Cancelled Cheque'
    ],
    applicationUrl: 'https://pmsuryaghar.gov.in',
    officialPortal: 'pmsuryaghar.gov.in',
    tags: ['Solar', 'Electricity', 'Green Energy', 'Renewable', 'Power', 'Rooftop']
  },
  {
    id: 'pm-kusum-solar-pump-scheme',
    title: 'PM-KUSUM Solar Agriculture Pump Scheme',
    shortDescription: '60% Government subsidy (30% Central + 30% State) for installing off-grid/grid solar irrigation pumps, replacing diesel pumps.',
    category: 'Energy & Tech',
    ministry: 'Ministry of New and Renewable Energy (MNRE)',
    benefitAmount: '60% Capital Subsidy on Solar Pumps',
    benefitType: 'Direct Capital Subsidy + Low-Interest Bank Loan',
    targetAudience: 'Farmers, Water User Associations, and FPOs with agricultural land',
    eligibilityCriteria: {
      employmentStatuses: ['farmer'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card & Land Revenue Records (Khasra/Khatauni/7/12)',
      'Bank Account Passbook',
      'Electricity / Diesel pump details'
    ],
    applicationUrl: 'https://pmkusum.mnre.gov.in',
    officialPortal: 'pmkusum.mnre.gov.in',
    tags: ['Solar Pump', 'Agriculture', 'KUSUM', 'Irrigation', 'Clean Energy']
  },
  {
    id: 'pm-edrive-ev-subsidy',
    title: 'PM E-DRIVE Electric Vehicle Subsidy Scheme',
    shortDescription: 'Direct purchase subsidy of ₹5,000 to ₹10,000 on Electric 2-Wheelers and ₹50,000 on 3-Wheelers through Aadhaar e-Vouchers.',
    category: 'Energy & Tech',
    ministry: 'Ministry of Heavy Industries (MHI)',
    benefitAmount: '₹5,000 to ₹50,000 Direct Price Reduction',
    benefitType: 'Aadhaar Authenticated e-Voucher Subsidy',
    targetAudience: 'All Indian citizens purchasing approved electric scooters, motorcycles, and 3-wheelers',
    eligibilityCriteria: {
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card of vehicle buyer',
      'Valid Driving License',
      'Mobile Number linked with Aadhaar'
    ],
    applicationUrl: 'https://pmedrive.heavyindustries.gov.in',
    officialPortal: 'pmedrive.heavyindustries.gov.in',
    tags: ['Electric Vehicle', 'EV', 'Subsidy', 'PM E-DRIVE', 'Green Transport']
  },

  // --------------------------------------------------------------------------
  // 4. MSME, BUSINESS, STARTUPS & LOANS
  // --------------------------------------------------------------------------
  {
    id: 'pm-mudra-yojana',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    shortDescription: 'Collateral-free institutional business credit loans up to ₹20 Lakh across Shishu, Kishore, Tarun & Tarun Plus tiers.',
    category: 'Financial & MSME',
    ministry: 'Ministry of Finance (Department of Financial Services)',
    benefitAmount: 'Loan up to ₹20 Lakh (Collateral-Free)',
    benefitType: 'Collateral-Free Institutional Loan',
    targetAudience: 'Micro-entrepreneurs, small businesses, self-employed, shopkeepers, service providers',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'working_salaried', 'job_seeker'],
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'PAN Card & Aadhaar Card',
      'Business Registration / Udyam Certificate',
      'Last 6 months Bank Statement',
      'Project Proposal / Machinery Quotation'
    ],
    applicationUrl: 'https://udyamimitra.in',
    officialPortal: 'mudra.org.in',
    tags: ['Mudra', 'Business Loan', 'Startup', 'MSME', 'Collateral Free', 'PMMY']
  },
  {
    id: 'pm-svanidhi-scheme',
    title: 'PM SVANidhi: Micro-Credit for Street Vendors',
    shortDescription: 'Working capital loan of ₹10,000, ₹20,000, and ₹50,000 with 7% interest subsidy and ₹1,200/yr cashback on digital UPI payments.',
    category: 'Financial & MSME',
    ministry: 'Ministry of Housing and Urban Affairs (MoHUA)',
    benefitAmount: '₹10,000 - ₹50,000 Working Capital + 7% Subsidy',
    benefitType: 'Low-Interest Working Capital Credit',
    targetAudience: 'Street vendors, hawkers, small shopkeepers, informal micro-traders in urban areas',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'job_seeker'],
      maxIncome: 400000,
      states: ['All India']
    },
    requiredDocuments: [
      'Vending Certificate / Letter of Recommendation (LoR)',
      'Aadhaar Card',
      'Bank Account Passbook',
      'UPI QR Code ID'
    ],
    applicationUrl: 'https://pmsvanidhi.mohua.gov.in',
    officialPortal: 'pmsvanidhi.mohua.gov.in',
    tags: ['SVANidhi', 'Vendors', 'Micro Loan', 'Street Vendors', 'Digital Cashback']
  },
  {
    id: 'stand-up-india-scheme',
    title: 'Stand-Up India Scheme for Women & SC/ST Entrepreneurs',
    shortDescription: 'Bank loans between ₹10 Lakh and ₹1 Crore for setting up new greenfield enterprises in manufacturing, services, or trading sector.',
    category: 'Financial & MSME',
    ministry: 'Department of Financial Services, Ministry of Finance',
    benefitAmount: '₹10 Lakh to ₹1 Crore Bank Loan',
    benefitType: 'Concessional Greenfield Enterprise Loan',
    targetAudience: 'Women entrepreneurs and SC/ST individuals starting new business units',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'working_salaried', 'job_seeker'],
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar & PAN Card',
      'Caste Certificate (for SC/ST) or Women ownership proof (>51%)',
      'Project Feasibility Report & Quotation',
      'Pollution / Municipal NOC if manufacturing'
    ],
    applicationUrl: 'https://www.standupmitra.in',
    officialPortal: 'standupmitra.in',
    tags: ['Women Entrepreneur', 'SC/ST', 'Business Loan', 'Manufacturing', 'Greenfield']
  },
  {
    id: 'pmegp-subsidy-loan',
    title: 'Prime Minister Employment Generation Programme (PMEGP)',
    shortDescription: '15% to 35% Capital Margin Money Subsidy on bank loans up to ₹50 Lakh for manufacturing and ₹20 Lakh for service units.',
    category: 'Financial & MSME',
    ministry: 'Ministry of MSME & KVIC',
    benefitAmount: '15% to 35% Margin Money Subsidy (Up to ₹17.5 Lakh)',
    benefitType: 'Government Capital Subsidy + Bank Credit',
    targetAudience: 'New entrepreneurs, rural artisans, SHGs, and educated unemployed youth aged 18+',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'job_seeker', 'working_salaried'],
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card & PAN Card',
      'Educational Marksheets (8th/10th pass minimum)',
      'Detailed Project Report (DPR)',
      'Special Category Certificate (for 35% rural subsidy)'
    ],
    applicationUrl: 'https://www.kviconline.gov.in/pmegpeportal',
    officialPortal: 'kviconline.gov.in',
    tags: ['PMEGP', 'KVIC', 'MSME Subsidy', 'Manufacturing', 'Self Employment']
  },
  {
    id: 'cgtmse-collateral-free-loan',
    title: 'CGTMSE: ₹5 Crore Collateral-Free Credit Guarantee',
    shortDescription: 'Government credit guarantee cover up to 85% on collateral-free bank loans up to ₹5 Crore for Micro and Small enterprises.',
    category: 'Financial & MSME',
    ministry: 'Ministry of MSME & SIDBI',
    benefitAmount: 'Up to ₹5 Crore Collateral-Free Credit Guarantee',
    benefitType: 'Credit Guarantee Backed Institutional Loan',
    targetAudience: 'Micro and Small manufacturing and service business owners with Udyam registration',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed'],
      states: ['All India']
    },
    requiredDocuments: [
      'Udyam Registration Certificate',
      'PAN & Aadhaar Card of Directors/Partners',
      'Audited Financial Statements (Last 2-3 years) or Project Report',
      'GST Returns & Bank Statements'
    ],
    applicationUrl: 'https://www.cgtmse.in',
    officialPortal: 'cgtmse.in',
    tags: ['CGTMSE', 'Credit Guarantee', 'MSME Loan', 'SIDBI', 'Collateral Free']
  },
  {
    id: 'startup-india-seed-fund-scheme',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    shortDescription: 'Government funding up to ₹20 Lakh grant for prototype development and ₹50 Lakh debt for market commercialization.',
    category: 'Financial & MSME',
    ministry: 'DPIIT, Ministry of Commerce and Industry',
    benefitAmount: 'Up to ₹20 Lakh Grant + ₹50 Lakh Debt Funding',
    benefitType: 'Direct Seed Capital & Convertible Debentures',
    targetAudience: 'DPIIT recognized innovative technology startups incorporated within past 2 years',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'student', 'job_seeker'],
      states: ['All India']
    },
    requiredDocuments: [
      'DPIIT Startup Recognition Certificate',
      'Certificate of Incorporation (MCA)',
      'Pitch Deck & Business Model Milestone Plan'
    ],
    applicationUrl: 'https://seedfund.startupindia.gov.in',
    officialPortal: 'seedfund.startupindia.gov.in',
    tags: ['Startup India', 'Seed Fund', 'Grants', 'Incubator', 'Innovation']
  },
  {
    id: 'pmfme-food-processing-scheme',
    title: 'PM Formalisation of Micro Food Processing (PMFME)',
    shortDescription: '35% capital subsidy (up to ₹10 Lakh) + ₹40,000 seed capital for setting up or upgrading micro food processing units.',
    category: 'Financial & MSME',
    ministry: 'Ministry of Food Processing Industries (MoFPI)',
    benefitAmount: '35% Credit-Linked Subsidy (Max ₹10 Lakh)',
    benefitType: 'Capital Investment Subsidy + Working Capital',
    targetAudience: 'Individual food processors, SHGs, FPOs, and cooperatives (bakery, spices, pickles, oil extraction)',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'farmer'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card, PAN Card & Business Address Proof',
      'Detailed Project Report (DPR) for Food Unit',
      'Quotation of Food Processing Machinery'
    ],
    applicationUrl: 'https://pmfme.mofpi.gov.in',
    officialPortal: 'pmfme.mofpi.gov.in',
    tags: ['Food Processing', 'PMFME', 'ODOP', 'Bakery', 'Spices', 'MSME']
  },

  // --------------------------------------------------------------------------
  // 5. AGRICULTURE & FARMER WELFARE
  // --------------------------------------------------------------------------
  {
    id: 'pm-kisan-samman-nidhi',
    title: 'PM-KISAN: Pradhan Mantri Kisan Samman Nidhi',
    shortDescription: 'Direct guaranteed income support of ₹6,000 per year in three equal 4-monthly installments for all landholding farmer families.',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    benefitAmount: '₹6,000 / year (₹2,000 every 4 months)',
    benefitType: 'Direct Benefit Transfer (DBT)',
    targetAudience: 'Small and marginal farmer households with cultivable landholding in their name',
    eligibilityCriteria: {
      employmentStatuses: ['farmer'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card with biometric/facial e-KYC',
      'Land Ownership Records (Khatauni / Patta / 7/12 extract)',
      'Bank Account linked with NPCI Aadhaar'
    ],
    applicationUrl: 'https://pmkisan.gov.in',
    officialPortal: 'pmkisan.gov.in',
    tags: ['Agriculture', 'Farmers', 'Kisan', 'DBT', 'Kisan Samman', '6000']
  },
  {
    id: 'pm-fasal-bima-yojana',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortDescription: 'Comprehensive crop insurance against droughts, floods, and unseasonal rains for low premium (1.5% Rabi, 2% Kharif).',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    benefitAmount: '100% Insured Crop Loss Compensation',
    benefitType: 'Crop Loss Insurance Claim (DBT)',
    targetAudience: 'All farmers cultivating notified food crops, oilseeds, and commercial/horticulture crops',
    eligibilityCriteria: {
      employmentStatuses: ['farmer'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card & Active Mobile Number',
      'Land Records (7/12, Patta, Sowing Certificate)',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://pmfby.gov.in',
    officialPortal: 'pmfby.gov.in',
    tags: ['Crop Insurance', 'PMFBY', 'Fasal Bima', 'Drought', 'Flood Relief']
  },
  {
    id: 'pm-matsya-sampada-yojana',
    title: 'Pradhan Mantri Matsya Sampada Yojana (PMMSY)',
    shortDescription: '40% to 60% Government subsidy for new fish ponds, Biofloc systems, RAS, ornamental fish units, and fish feed mills.',
    category: 'Agriculture',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    benefitAmount: '40% to 60% Project Capital Subsidy',
    benefitType: 'Capital Grant + Bank Credit Linkage',
    targetAudience: 'Fishers, fish farmers, rural youth, SHGs, and fisheries cooperatives',
    eligibilityCriteria: {
      employmentStatuses: ['farmer', 'working_self_employed', 'job_seeker'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card & PAN Card',
      'Land Ownership / Lease Agreement for pond (min 7-10 years)',
      'Detailed Project Report (DPR)',
      'Bank Account Details'
    ],
    applicationUrl: 'https://pmmsy.dof.gov.in',
    officialPortal: 'pmmsy.dof.gov.in',
    tags: ['Fisheries', 'PMMSY', 'Fish Farming', 'Biofloc', 'Aquaculture', 'Subsidy']
  },
  {
    id: 'kisan-credit-card-kcc',
    title: 'Kisan Credit Card (KCC) Scheme',
    shortDescription: 'Low-interest short-term working capital crop loan up to ₹3,00,000 at an effective 4% annual interest rate with timely repayment.',
    category: 'Agriculture',
    ministry: 'Ministry of Agriculture and Farmers Welfare & RBI',
    benefitAmount: 'Up to ₹3 Lakh Concessional Loan at 4% Interest',
    benefitType: 'Low-Interest Revolving Agriculture Credit',
    targetAudience: 'Farmers, cultivators, tenant farmers, dairy owners, and fishery rearers',
    eligibilityCriteria: {
      employmentStatuses: ['farmer', 'working_self_employed'],
      states: ['All India']
    },
    requiredDocuments: [
      'KCC Application Form',
      'Aadhaar Card & Land Records (Khasra/Khatauni/7/12)',
      'Crop cultivation declaration'
    ],
    applicationUrl: 'https://pmkisan.gov.in',
    officialPortal: 'pmkisan.gov.in',
    tags: ['KCC', 'Kisan Credit Card', '4% Loan', 'Crop Loan', 'Agriculture']
  },

  // --------------------------------------------------------------------------
  // 6. EDUCATION, SCHOLARSHIPS & FELLOWSHIPS
  // --------------------------------------------------------------------------
  {
    id: 'post-matric-scholarship-scheme',
    title: 'National Scholarship Portal (NSP) - Post-Matric Scholarships',
    shortDescription: 'Full college tuition fee reimbursement + up to ₹20,000/year annual maintenance allowance for college students.',
    category: 'Education',
    ministry: 'Ministry of Education & Ministry of Social Justice',
    benefitAmount: '₹10,000 to ₹50,000 / year + Full Fee Waiver',
    benefitType: 'Direct DBT Scholarship to Student Account',
    targetAudience: 'College, Undergraduate, Engineering, Medical, and Postgraduate students',
    eligibilityCriteria: {
      employmentStatuses: ['student'],
      maxIncome: 450000,
      states: ['All India'],
      maxAge: 32
    },
    requiredDocuments: [
      'College Admission Fee Receipt & Student ID',
      'Class 10th & 12th Marksheet',
      'Income Certificate (< ₹4.5 Lakh)',
      'Aadhaar seeded bank account details',
      'Caste Certificate / EWS Certificate (if applicable)'
    ],
    applicationUrl: 'https://scholarships.gov.in',
    officialPortal: 'scholarships.gov.in',
    tags: ['Scholarship', 'College', 'Students', 'Tuition Fee', 'NSP', 'Higher Education']
  },
  {
    id: 'pm-internship-scheme-pmis',
    title: 'PM Internship Scheme (PMIS) in Top 500 Companies',
    shortDescription: '₹5,000 monthly government stipend + ₹6,000 one-time grant + 12 months practical corporate training in Top 500 Indian companies.',
    category: 'Education',
    ministry: 'Ministry of Corporate Affairs (MCA)',
    benefitAmount: '₹5,000 / month Stipend + ₹6,000 Grant',
    benefitType: 'Direct Stipend Transfer + Corporate Placement',
    targetAudience: 'Graduates (BA, B.Sc, B.Com, BBA, BCA, B.Tech), Diploma & ITI holders aged 21-24 years',
    eligibilityCriteria: {
      employmentStatuses: ['student', 'job_seeker'],
      maxIncome: 800000,
      minAge: 21,
      maxAge: 24,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'College Degree / Diploma / Marksheets',
      'Bonafide Certificate / Passing Certificate',
      'Bank Account linked to NPCI'
    ],
    applicationUrl: 'https://pminternship.mca.gov.in',
    officialPortal: 'pminternship.mca.gov.in',
    tags: ['Internship', 'PMIS', 'Stipend', 'Students', 'Top 500 Companies', 'Youth']
  },
  {
    id: 'pm-usha-higher-education',
    title: 'PM-USHA: Modern Smart Classrooms & Higher Education Hubs',
    shortDescription: 'State universities and colleges upgrade research labs, digital libraries, and smart classrooms under central grants.',
    category: 'Education',
    ministry: 'Ministry of Education (Department of Higher Education)',
    benefitAmount: 'Institutional Development & Research Hub Grants',
    benefitType: 'Institutional Educational Infrastructure Grant',
    targetAudience: 'Students enrolled in state government universities and colleges across India',
    eligibilityCriteria: {
      employmentStatuses: ['student'],
      states: ['All India']
    },
    requiredDocuments: [
      'University Enrolment ID',
      'College Bonafide Certificate'
    ],
    applicationUrl: 'https://pmusha.education.gov.in',
    officialPortal: 'pmusha.education.gov.in',
    tags: ['Higher Education', 'PM-USHA', 'University', 'Smart Labs', 'Colleges']
  },
  {
    id: 'dst-inspire-fellowship',
    title: 'INSPIRE Scholarship & Ph.D. Fellowship (DST)',
    shortDescription: '₹80,000/yr scholarship for B.Sc/M.Sc students and ₹42,000/month fellowship for Ph.D. scholars in basic sciences.',
    category: 'Education',
    ministry: 'Department of Science and Technology (DST)',
    benefitAmount: '₹80,000 / year (SHE) | ₹42,000 / month (Ph.D.)',
    benefitType: 'Direct DBT Science Fellowship',
    targetAudience: 'Top 1% Class 12th rankers and university science toppers pursuing Natural & Basic Sciences',
    eligibilityCriteria: {
      employmentStatuses: ['student'],
      states: ['All India'],
      maxAge: 32
    },
    requiredDocuments: [
      'Class 12th Marksheet & Board Advisory Note',
      'College Science Admission Endorsement',
      'Aadhaar Card & Bank Account Passbook'
    ],
    applicationUrl: 'https://online-inspire.gov.in',
    officialPortal: 'online-inspire.gov.in',
    tags: ['INSPIRE', 'DST', 'Science Fellowship', 'Research', 'Ph.D. Stipend']
  },
  {
    id: 'aicte-pragati-scholarship',
    title: 'AICTE Pragati Scholarship for Girl Students',
    shortDescription: '₹50,000 per year for female students pursuing Degree (4 years = ₹2 Lakh) or Diploma (3 years = ₹1.5 Lakh) technical education.',
    category: 'Education',
    ministry: 'AICTE & Ministry of Education',
    benefitAmount: '₹50,000 / year (Up to ₹2,00,000 Total)',
    benefitType: 'Direct DBT Technical Education Scholarship',
    targetAudience: 'Girl students admitted to 1st year or Lateral Entry in AICTE-approved Degree/Diploma colleges',
    eligibilityCriteria: {
      employmentStatuses: ['student'],
      genders: ['female'],
      maxIncome: 800000,
      states: ['All India']
    },
    requiredDocuments: [
      'Class 10th & 12th Marksheet',
      'AICTE College Admission Allotment & Fee Receipt',
      'Income Certificate (< ₹8 Lakh)',
      'Aadhaar seeded bank account passbook'
    ],
    applicationUrl: 'https://scholarships.gov.in',
    officialPortal: 'scholarships.gov.in',
    tags: ['Girl Student', 'AICTE', 'Pragati', 'Engineering', 'Diploma', 'Scholarship']
  },

  // --------------------------------------------------------------------------
  // 7. WOMEN, CHILD & FAMILY WELFARE
  // --------------------------------------------------------------------------
  {
    id: 'sukanya-samriddhi-yojana',
    title: 'Sukanya Samriddhi Yojana (Beti Bachao Beti Padhao)',
    shortDescription: 'High-yield government backed savings scheme (8.2% p.a.) with triple tax exemption (80C) for girl child education and marriage.',
    category: 'Women & Child',
    ministry: 'Ministry of Women and Child Development & Department of Posts',
    benefitAmount: '8.2% Compound Interest + Triple Tax Exemption (EEE)',
    benefitType: 'Sovereign Guaranteed Savings Plan',
    targetAudience: 'Parents/guardians of girl children below 10 years of age',
    eligibilityCriteria: {
      states: ['All India']
    },
    requiredDocuments: [
      'Girl Child Birth Certificate',
      'Parent / Guardian Aadhaar & PAN Card',
      'Proof of Residence',
      'Passport size photographs'
    ],
    applicationUrl: 'https://www.indiapost.gov.in',
    officialPortal: 'indiapost.gov.in',
    tags: ['Girl Child', 'Women', 'Savings', '80C', 'Education Fund', 'Sukanya']
  },
  {
    id: 'lakhpati-didi-scheme',
    title: 'Lakhpati Didi: Rural Women Micro-Enterprise Initiative',
    shortDescription: 'Interest-subvention loans up to ₹10 Lakh + vocational skilling for Self-Help Group (SHG) women to achieve ₹1 Lakh+ annual income.',
    category: 'Women & Child',
    ministry: 'Ministry of Rural Development (MoRD)',
    benefitAmount: 'Subsidized Loans up to ₹10 Lakh + Business Grants',
    benefitType: 'SHG Community Investment Fund & Bank Credit',
    targetAudience: 'Women members of rural Self-Help Groups (SHGs) under NRLM',
    eligibilityCriteria: {
      genders: ['female'],
      employmentStatuses: ['working_self_employed', 'homemaker', 'farmer', 'job_seeker'],
      states: ['All India']
    },
    requiredDocuments: [
      'SHG Membership Passbook',
      'Aadhaar Card & Active Mobile Number',
      'Micro-Investment Business Proposal'
    ],
    applicationUrl: 'https://nrlm.gov.in',
    officialPortal: 'nrlm.gov.in',
    tags: ['Lakhpati Didi', 'SHG', 'Women Enterprise', 'Rural Women', 'NRLM']
  },
  {
    id: 'pm-matru-vandana-yojana',
    title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    shortDescription: 'Cash incentive of ₹5,000 (1st child) and ₹6,000 (2nd child if girl) directly transferred to mother bank account for maternity health.',
    category: 'Women & Child',
    ministry: 'Ministry of Women and Child Development',
    benefitAmount: '₹5,000 to ₹6,000 Direct Cash Benefit',
    benefitType: 'Direct Benefit Transfer (DBT)',
    targetAudience: 'Pregnant women and lactating mothers for nutritional support and wage loss compensation',
    eligibilityCriteria: {
      genders: ['female'],
      maxIncome: 800000,
      states: ['All India']
    },
    requiredDocuments: [
      'Mother and Child Protection (MCP) Card',
      'Aadhaar Card of Mother and Husband',
      'Bank Account Passbook (Aadhaar linked)',
      'Child Birth Registration Certificate'
    ],
    applicationUrl: 'https://pmmvy.wcd.gov.in',
    officialPortal: 'pmmvy.wcd.gov.in',
    tags: ['Maternity', 'PMMVY', 'Pregnant Women', 'Cash Incentive', 'Nutrition']
  },
  {
    id: 'mission-vatsalya-child-support',
    title: 'Mission Vatsalya - Orphan & Vulnerable Child Sponsorship',
    shortDescription: 'Monthly financial sponsorship grant of ₹4,000 per child for education, boarding, and nutrition till age 18.',
    category: 'Women & Child',
    ministry: 'Ministry of Women and Child Development',
    benefitAmount: '₹4,000 / month per child till 18 years',
    benefitType: 'Direct Monthly Welfare Grant (DBT)',
    targetAudience: 'Orphan children, children of single mothers, and destitute children in distress',
    eligibilityCriteria: {
      maxIncome: 96000,
      states: ['All India']
    },
    requiredDocuments: [
      'Child Birth Certificate & Aadhaar Card',
      'Income Certificate / Destitution proof',
      'School Enrolment Certificate',
      'Guardian Bank Account Details'
    ],
    applicationUrl: 'https://wcd.nic.in/schemes/mission-vatsalya',
    officialPortal: 'wcd.nic.in',
    tags: ['Child Protection', 'Mission Vatsalya', 'Orphan Grant', '4000 Per Month']
  },

  // --------------------------------------------------------------------------
  // 8. SOCIAL SECURITY & PENSIONS
  // --------------------------------------------------------------------------
  {
    id: 'atal-pension-yojana',
    title: 'Atal Pension Yojana (APY)',
    shortDescription: 'Government guaranteed monthly pension from ₹1,000 to ₹5,000 after 60 years of age with return of entire corpus to nominee.',
    category: 'Social Security',
    ministry: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    benefitAmount: 'Guaranteed ₹1,000 to ₹5,000 Monthly Pension',
    benefitType: 'Social Security Old-Age Pension',
    targetAudience: 'All Indian citizens aged 18 to 40 years in unorganized sector',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 40,
      states: ['All India']
    },
    requiredDocuments: [
      'Savings Bank Account / Post Office Account',
      'Aadhaar Card',
      'Mobile Number',
      'Nominee details'
    ],
    applicationUrl: 'https://enps.nsdl.com',
    officialPortal: 'npscra.nsdl.co.in',
    tags: ['Pension', 'Social Security', 'Retirement', 'Senior Citizen', 'APY']
  },
  {
    id: 'nsap-old-age-pension-scheme',
    title: 'National Social Assistance Old Age Pension (IGNOAPS)',
    shortDescription: 'Monthly social pension of ₹1,000 to ₹3,000 per month for senior citizens aged 60+ living below the poverty line.',
    category: 'Social Security',
    ministry: 'Ministry of Rural Development (MoRD)',
    benefitAmount: '₹1,000 to ₹3,000 / month for life',
    benefitType: 'Direct Monthly Old Age Pension (DBT)',
    targetAudience: 'Senior citizens aged 60+ belonging to BPL households',
    eligibilityCriteria: {
      minAge: 60,
      maxIncome: 200000,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card & Age Proof',
      'BPL Ration Card / SECC list slip',
      'Bank Account Passbook (Aadhaar seeded)'
    ],
    applicationUrl: 'https://nsap.nic.in',
    officialPortal: 'nsap.nic.in',
    tags: ['Old Age Pension', 'NSAP', 'Senior Citizen', 'BPL', 'Monthly Pension']
  },
  {
    id: 'pm-shram-yogi-maan-dhan',
    title: 'PM Shram Yogi Maan-dhan (PM-SYM)',
    shortDescription: 'Guaranteed ₹3,000 monthly pension after 60 years of age for unorganized workers with 50:50 matching government co-contribution.',
    category: 'Social Security',
    ministry: 'Ministry of Labour and Employment',
    benefitAmount: '₹3,000 / month Guaranteed Pension',
    benefitType: 'Co-contributory Social Security Pension',
    targetAudience: 'Unorganized workers (drivers, maids, construction workers, vendors) with monthly income <= ₹15,000',
    eligibilityCriteria: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 180000,
      employmentStatuses: ['working_self_employed', 'working_salaried', 'job_seeker'],
      states: ['All India']
    },
    requiredDocuments: [
      'e-Shram Card / Aadhaar Card',
      'Savings Bank Account Passbook with IFSC',
      'Active Mobile Number'
    ],
    applicationUrl: 'https://maandhan.in',
    officialPortal: 'maandhan.in',
    tags: ['PM-SYM', 'Shram Yogi', 'Labour Pension', 'e-Shram', 'Unorganized Workers']
  },
  {
    id: 'divyangjan-disability-pension',
    title: 'Indira Gandhi National Disability Pension (IGNDPS)',
    shortDescription: 'Monthly financial assistance of ₹1,000 to ₹3,500/month + free assistive aids for specially-abled citizens (>= 80% disability).',
    category: 'Social Security',
    ministry: 'Ministry of Social Justice and Empowerment',
    benefitAmount: '₹1,000 to ₹3,500 / month + Free Assistive Devices',
    benefitType: 'Direct Disability Pension (DBT)',
    targetAudience: 'Persons with severe disability (>= 80%) belonging to BPL households aged 18+',
    eligibilityCriteria: {
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'UDID Card / Disability Certificate (>= 80%)',
      'Aadhaar Card',
      'BPL Card / Income Certificate',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://nsap.nic.in',
    officialPortal: 'swavlambancard.gov.in',
    tags: ['Divyang', 'Disability Pension', 'UDID', 'Social Security', 'Special Needs']
  },

  // --------------------------------------------------------------------------
  // 9. EMPLOYMENT, SKILLING & VOCATIONAL DEVELOPMENT
  // --------------------------------------------------------------------------
  {
    id: 'pm-kaushal-vikas-yojana',
    title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)',
    shortDescription: '100% free industry skilling in AI, Drones, Solar PV, Electric Vehicles, and IT with recognized NSQF certification & placement assistance.',
    category: 'Employment & Skilling',
    ministry: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    benefitAmount: '100% Free Training + NSQF Certificate + ₹8,000 Support',
    benefitType: 'Free Vocational Training + Placement Linkage',
    targetAudience: 'School/College dropouts, unemployed youth, and workers seeking tech certification aged 15-45',
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 45,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Educational Marksheets (10th/12th/Graduation)',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://skillindiadigital.gov.in',
    officialPortal: 'skillindiadigital.gov.in',
    tags: ['PMKVY', 'Skill India', 'Free Courses', 'AI Training', 'Drone Pilot', 'NSDC']
  },
  {
    id: 'naps-apprenticeship-promotion',
    title: 'National Apprenticeship Promotion Scheme (NAPS-2)',
    shortDescription: 'On-the-job industrial apprenticeship with monthly stipend up to ₹9,000 co-funded by Central Government across Top Indian PSUs & Corporates.',
    category: 'Employment & Skilling',
    ministry: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    benefitAmount: 'Up to ₹9,000 / month Stipend (Co-funded DBT)',
    benefitType: 'Paid Industrial Apprenticeship Contract',
    targetAudience: 'Candidates with ITI, Diploma, 12th pass, or Graduate degrees seeking industrial work experience',
    eligibilityCriteria: {
      minAge: 14,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card (e-KYC)',
      'Academic Transcripts (ITI / Diploma / Degree)',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://www.apprenticeshipindia.gov.in',
    officialPortal: 'apprenticeshipindia.gov.in',
    tags: ['NAPS', 'Apprenticeship', 'Stipend', 'Industrial Training', 'ITI', 'Jobs']
  },
  {
    id: 'ddu-gky-rural-placement',
    title: 'DDU-GKY: Free Residential Skilling with Guaranteed Jobs',
    shortDescription: '100% free residential skill training (free food, hostel, tablet, uniform) with guaranteed minimum 70% corporate job placement for rural youth.',
    category: 'Employment & Skilling',
    ministry: 'Ministry of Rural Development (MoRD)',
    benefitAmount: 'Free Residential Skilling + Guaranteed Job Placement',
    benefitType: 'Residential Vocational Training & Employment',
    targetAudience: 'Rural youth aged 15-35 years from BPL / MGNREGA / NRLM families',
    eligibilityCriteria: {
      minAge: 15,
      maxAge: 35,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'BPL Card / MGNREGA Job Card of family',
      'Educational Marksheet (8th/10th pass minimum)',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://ddugky.gov.in',
    officialPortal: 'ddugky.gov.in',
    tags: ['DDU-GKY', 'Rural Youth', 'Free Hostel', 'Guaranteed Job', 'Skilling']
  },
  {
    id: 'samarth-textile-skilling-scheme',
    title: 'SAMARTH: Textile & Garment Industry Skilling Scheme',
    shortDescription: 'Free advanced apparel and textile manufacturing training with biometric certification and mandatory 70% job placement in export houses.',
    category: 'Employment & Skilling',
    ministry: 'Ministry of Textiles',
    benefitAmount: 'Free Advanced Training + Guaranteed Textile Job',
    benefitType: 'Wage Employment Linked Skilling Program',
    targetAudience: 'Youth and women seeking employment in apparel manufacturing and textile clusters',
    eligibilityCriteria: {
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Proof of Age & Residence',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://samarth-textiles.gov.in',
    officialPortal: 'samarth-textiles.gov.in',
    tags: ['Textiles', 'Samarth', 'Garment Training', 'Stitching', 'Apparel Jobs']
  },
  {
    id: 'khelo-india-sports-scholarship',
    title: 'Khelo India National Sports Scholarship',
    shortDescription: '₹6,28,000 per year total support (₹1.20 Lakh cash allowance + world-class coaching & nutrition) for young athletic talent for 8 continuous years.',
    category: 'Employment & Skilling',
    ministry: 'Ministry of Youth Affairs and Sports & SAI',
    benefitAmount: '₹6,28,000 / year per athlete support',
    benefitType: 'Direct Sports Scholarship + Academy Coaching',
    targetAudience: 'Talented athletes aged 10-18 years scouted at National & State games across Olympic disciplines',
    eligibilityCriteria: {
      minAge: 10,
      maxAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Athlete Birth Certificate & Aadhaar Card',
      'State/National Sports Participation Certificate',
      'School Bonafide Certificate',
      'Bank Account Passbook'
    ],
    applicationUrl: 'https://kheloindia.gov.in',
    officialPortal: 'kheloindia.gov.in',
    tags: ['Sports', 'Khelo India', 'Athlete Scholarship', 'SAI', 'Olympic Training']
  },

  // --------------------------------------------------------------------------
  // 10. ARTISANS, TRADITIONAL CRAFTS & HANDLOOMS
  // --------------------------------------------------------------------------
  {
    id: 'pm-vishwakarma-scheme',
    title: 'PM Vishwakarma Scheme for Traditional Artisans',
    shortDescription: '₹15,000 modern toolkit grant (e-Voucher) + up to ₹3,00,000 loan at 5% concessional interest + ₹500/day daily stipend for 18 traditional trades.',
    category: 'Handicrafts & Artisans',
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    benefitAmount: '₹15,000 Toolkit Grant + ₹3 Lakh Loan at 5%',
    benefitType: 'Toolkit Grant + Concessional Collateral-Free Credit',
    targetAudience: 'Traditional craftspeople (Carpenters, Blacksmiths, Potters, Masons, Tailors, Barbers, Cobblers, Sculptors)',
    eligibilityCriteria: {
      minAge: 18,
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card and Mobile Number',
      'Ration Card / Family Proof',
      'Bank Account details (Aadhaar linked)',
      'Trade declaration'
    ],
    applicationUrl: 'https://pmvishwakarma.gov.in',
    officialPortal: 'pmvishwakarma.gov.in',
    tags: ['Vishwakarma', 'Artisans', 'Karigar', 'Toolkit Grant', '5% Loan', 'Traditional Trades']
  },
  {
    id: 'nhdp-weavers-mudra-scheme',
    title: 'National Handloom Development & Weavers Mudra Scheme',
    shortDescription: 'Concessional loans up to ₹2,00,000 with 6% interest subvention + ₹25,000 margin money grant + 15% subsidized yarn supply for weavers.',
    category: 'Handicrafts & Artisans',
    ministry: 'Ministry of Textiles (Development Commissioner for Handlooms)',
    benefitAmount: 'Up to ₹2 Lakh Loan + ₹25,000 Margin Grant',
    benefitType: 'Concessional Weavers Credit + Yarn Subsidy',
    targetAudience: 'Individual handloom weavers, master weavers, and handloom cooperative societies',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed'],
      states: ['All India']
    },
    requiredDocuments: [
      'Weaver Pehchan Card (QR Code)',
      'Aadhaar Card & PAN Card',
      'Bank Account Passbook',
      'Loom ownership declaration'
    ],
    applicationUrl: 'https://handlooms.nic.in',
    officialPortal: 'handlooms.nic.in',
    tags: ['Handloom', 'Weavers', 'Yarn Subsidy', 'Bunkar', 'Textile Artisan']
  },
  {
    id: 'usttad-minority-artisan-scheme',
    title: 'USTTAD Scheme for Heritage Traditional Crafts',
    shortDescription: 'Master craftsmen apprenticeship training + ₹3,000/month stipend + free exhibition stalls at Hunar Haats with direct export links.',
    category: 'Handicrafts & Artisans',
    ministry: 'Ministry of Minority Affairs',
    benefitAmount: '₹3,000 / month Stipend + Free Exhibition Stalls',
    benefitType: 'Master Craft Training Grant + Market Access',
    targetAudience: 'Traditional artisans from notified minority communities practicing heritage crafts (Zardozi, Chikankari, Brassware, Pottery)',
    eligibilityCriteria: {
      employmentStatuses: ['working_self_employed', 'job_seeker'],
      states: ['All India']
    },
    requiredDocuments: [
      'Aadhaar Card',
      'Minority Community Self-Declaration',
      'Artisan Identity Card',
      'Bank Account Details'
    ],
    applicationUrl: 'https://minorityaffairs.gov.in',
    officialPortal: 'minorityaffairs.gov.in',
    tags: ['USTTAD', 'Hunar Haat', 'Minority Artisans', 'Traditional Crafts', 'Zardozi']
  }
];

