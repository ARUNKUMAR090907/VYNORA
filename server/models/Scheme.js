import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Scheme title is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    states: {
      type: [String],
      default: [],
    },
    targetGroups: {
      type: [String],
      default: [],
    },
    incomeCriteria: {
      min: Number,
      max: Number,
    },
    genderCriteria: {
      type: [String],
      default: [],
    },
    communityCriteria: {
      type: [String],
      default: [],
    },
    occupationCriteria: {
      type: [String],
      default: [],
    },
    houseCriteria: {
      type: [String],
      default: [],
    },
    ageCriteria: {
      min: Number,
      max: Number,
    },
    requiredDocuments: {
      type: [String],
      default: [],
    },
    applicationProcess: {
      type: String,
      trim: true,
    },
    officialLink: {
      type: String,
      trim: true,
    },
    deadline: {
      type: Date,
    },
    eligibilityRules: {
      type: [String],
      default: [],
    },
    languageData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    benefits: {
      type: String,
      trim: true,
    },
    eligibilityScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
