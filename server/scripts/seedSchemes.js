import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Scheme from '../models/Scheme.js';
import { SCHEMES_DATABASE } from '../data/schemesData.js';
import { calculateEligibility } from '../services/eligibilityService.js';

dotenv.config();

export const seedDemoUser = async () => {
  try {
    let demoUser = await User.findOne({ username: 'demo_citizen' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Ramesh Patel',
        email: 'demo@vynora.gov.in',
        username: 'demo_citizen',
        password: 'DemoCitizen123!',
        annualIncome: 180000,
        houseType: 'Kutcha',
        gender: 'Male',
        address: '42, Panchayat Union Road',
        state: 'Tamil Nadu',
        district: 'Salem',
        pincode: '636001',
        nativeLanguage: 'English',
        community: 'OBC',
        occupationStatus: 'Farmer',
        profileCompleted: true,
      });
      console.log('✅ Demo citizen created: demo_citizen / DemoCitizen123!');
    }
    await calculateEligibility(demoUser._id);
  } catch (error) {
    console.warn('Notice seeding demo citizen:', error.message);
  }
};

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/govt-schemes';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for scheme seeding');

    // Transform and map to model
    const docs = SCHEMES_DATABASE.map((s) => ({
      slug: s.id,
      title: s.title,
      shortDescription: s.shortDescription || '',
      category: s.category || 'General Welfare',
      ministry: s.ministry || '',
      benefitAmount: s.benefitAmount || '',
      benefitType: s.benefitType || 'Direct Benefit Transfer',
      targetAudience: s.targetAudience || '',
      eligibilityCriteria: {
        maxIncome: s.eligibilityCriteria?.maxIncome ?? null,
        minIncome: s.eligibilityCriteria?.minIncome ?? null,
        houseTypes: s.eligibilityCriteria?.houseTypes || [],
        employmentStatuses: s.eligibilityCriteria?.employmentStatuses || [],
        categories: s.eligibilityCriteria?.categories || [],
        states: s.eligibilityCriteria?.states || ['All India'],
        genders: s.eligibilityCriteria?.genders || [],
        minAge: s.eligibilityCriteria?.minAge ?? null,
        maxAge: s.eligibilityCriteria?.maxAge ?? null,
      },
      requiredDocuments: s.requiredDocuments || [],
      applicationUrl: s.applicationUrl || '',
      officialPortal: s.officialPortal || '',
      tags: s.tags || [],
      lastVerifiedAt: new Date(),
    }));

    // Clear existing schemes and insert fresh verified records
    await Scheme.deleteMany({});
    const inserted = await Scheme.insertMany(docs);
    console.log(`✅ Successfully seeded ${inserted.length} verified government schemes into MongoDB!`);
    return inserted.length;
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  }
};

// If run directly via CLI
if (process.argv[1]?.includes('seedSchemes.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
