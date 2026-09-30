import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    // Authentication fields
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },

    // Canonical Profile fields
    name: {
      type: String,
      trim: true,
      default: '',
    },
    annualIncome: {
      type: Number,
      default: 0,
    },
    houseType: {
      type: String,
      enum: ['Owned', 'Rental', 'Kutcha', 'Homeless', ''],
      default: '',
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    district: {
      type: String,
      trim: true,
      default: '',
    },
    pincode: {
      type: String,
      trim: true,
      default: '',
    },
    nativeLanguage: {
      type: String,
      enum: ['English', 'Tamil', 'Hindi', 'Telugu', 'Kannada', 'Malayalam'],
      default: 'English',
    },
    community: {
      type: String,
      enum: ['General', 'OBC', 'SC', 'ST', 'EWS', ''],
      default: '',
    },
    occupationStatus: {
      type: String,
      enum: ['Student', 'Working Professional', 'Self-employed', 'Farmer', 'Artisan', 'Unemployed', ''],
      default: '',
    },

    // System & Eligibility tracking
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    eligibilityCache: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
    eligibilityLastUpdated: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Check profile completion based on required fields
userSchema.methods.checkProfileCompletion = function () {
  const hasName = Boolean(this.name && this.name.trim().length > 0);
  const hasIncome = typeof this.annualIncome === 'number' && this.annualIncome >= 0;
  const hasHouse = Boolean(this.houseType && this.houseType.trim().length > 0);
  const hasGender = Boolean(this.gender && this.gender.trim().length > 0);
  const hasState = Boolean(this.state && this.state.trim().length > 0);
  const hasDistrict = Boolean(this.district && this.district.trim().length > 0);
  const hasCommunity = Boolean(this.community && this.community.trim().length > 0);
  const hasOccupation = Boolean(this.occupationStatus && this.occupationStatus.trim().length > 0);

  const isComplete = hasName && hasIncome && hasHouse && hasGender && hasState && hasDistrict && hasCommunity && hasOccupation;
  this.profileCompleted = isComplete;
  return isComplete;
};

// Return safe user object for responses
userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    email: this.email,
    username: this.username,
    name: this.name || '',
    annualIncome: this.annualIncome || 0,
    houseType: this.houseType || '',
    gender: this.gender || '',
    address: this.address || '',
    state: this.state || '',
    district: this.district || '',
    pincode: this.pincode || '',
    nativeLanguage: this.nativeLanguage || 'English',
    community: this.community || '',
    occupationStatus: this.occupationStatus || '',
    profileCompleted: Boolean(this.profileCompleted),
    eligibilityLastUpdated: this.eligibilityLastUpdated,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

const User = mongoose.model('User', userSchema);

export default User;
