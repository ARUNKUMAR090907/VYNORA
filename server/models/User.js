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

    // Profile fields
    name: {
      type: String,
      trim: true,
    },
    annualIncome: {
      type: String,
      trim: true,
    },
    houseType: {
      type: String,
      enum: ['Owned', 'Rental', ''],
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
    },
    state: {
      type: String,
      trim: true,
    },
    nativeLanguage: {
      type: String,
      enum: ['English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Hindi'],
      default: 'English',
    },
    community: {
      type: String,
      trim: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    occupationStatus: {
      type: String,
      enum: ['Student', 'Working Professional', ''],
      default: '',
    },

    // System fields
    profileCompleted: {
      type: Boolean,
      default: false,
    },
    eligibilityCache: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
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
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Mark profile as complete when all required fields are filled
userSchema.methods.checkProfileCompletion = function () {
  const requiredFields = ['name', 'annualIncome', 'houseType', 'gender', 'address', 'state', 'community', 'occupationStatus'];
  const isComplete = requiredFields.every(field => this[field] && this[field].trim() !== '');
  this.profileCompleted = isComplete;
};

const User = mongoose.model('User', userSchema);

export default User;
