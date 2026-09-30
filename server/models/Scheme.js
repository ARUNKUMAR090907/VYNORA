import mongoose from 'mongoose';

const schemeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Scheme slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Scheme title is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      trim: true,
      default: 'General Welfare',
    },
    ministry: {
      type: String,
      trim: true,
      default: '',
    },
    benefitAmount: {
      type: String,
      trim: true,
      default: '',
    },
    benefitType: {
      type: String,
      trim: true,
      default: 'Direct Benefit Transfer',
    },
    targetAudience: {
      type: String,
      trim: true,
      default: '',
    },
    eligibilityCriteria: {
      maxIncome: { type: Number, default: null },
      minIncome: { type: Number, default: null },
      houseTypes: { type: [String], default: [] },
      employmentStatuses: { type: [String], default: [] },
      categories: { type: [String], default: [] },
      states: { type: [String], default: ['All India'] },
      genders: { type: [String], default: [] },
      minAge: { type: Number, default: null },
      maxAge: { type: Number, default: null },
    },
    requiredDocuments: {
      type: [String],
      default: [],
    },
    applicationUrl: {
      type: String,
      trim: true,
      default: '',
    },
    officialPortal: {
      type: String,
      trim: true,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    lastVerifiedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

schemeSchema.index({ slug: 1 });
schemeSchema.index({ title: 'text', shortDescription: 'text', category: 'text', tags: 'text' });

const Scheme = mongoose.model('Scheme', schemeSchema);

export default Scheme;
