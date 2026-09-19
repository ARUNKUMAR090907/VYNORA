import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from '../models/Scheme.js';

dotenv.config();

const schemes = [
  {
    title: 'Pradhan Mantri Awas Yojana',
    description: 'Housing scheme for all',
    category: 'Housing',
    states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
    targetGroups: ['Low Income', 'Middle Income'],
    incomeCriteria: { min: 0, max: 1800000 },
    genderCriteria: ['Male', 'Female', 'Other'],
    communityCriteria: ['General', 'OBC', 'SC', 'ST'],
    occupationCriteria: ['Student', 'Working Professional', 'Self-employed', 'Unemployed'],
    houseCriteria: ['Owned', 'Rental'],
    ageCriteria: { min: 18, max: 100 },
    requiredDocuments: ['Aadhar', 'Bank Account', 'Income Certificate'],
    applicationProcess: 'Online through official portal',
    officialLink: 'https://pmaymis.gov.in',
    deadline: '2024-12-31',
    benefits: 'Home loan subsidy up to Rs. 2.67 lakhs',
  },
  {
    title: 'Jan Dhan Yojana',
    description: 'Financial inclusion scheme',
    category: 'Banking',
    states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'],
    targetGroups: ['All'],
    incomeCriteria: { min: 0, max: 10000000 },
    genderCriteria: ['Male', 'Female', 'Other'],
    communityCriteria: ['General', 'OBC', 'SC', 'ST'],
    occupationCriteria: ['Student', 'Working Professional', 'Self-employed', 'Unemployed', 'Retired'],
    houseCriteria: ['Owned', 'Rental'],
    ageCriteria: { min: 18, max: 100 },
    requiredDocuments: ['Aadhar', 'Voter ID'],
    applicationProcess: 'Offline at nearest bank branch',
    officialLink: 'https://pmjdy.gov.in',
    deadline: null,
    benefits: 'Zero balance bank account with insurance benefits',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log('Cleared existing schemes');

    // Insert sample schemes
    const inserted = await Scheme.insertMany(schemes);
    console.log(`Inserted ${inserted.length} schemes`);

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
