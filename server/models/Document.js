import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    userEmail: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      default: 'image/jpeg',
    },
    originalSizeBytes: {
      type: Number,
      default: 0,
    },
    compressedSizeBytes: {
      type: Number,
      default: 0,
    },
    dataUrl: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.models.Document || mongoose.model('Document', documentSchema);
