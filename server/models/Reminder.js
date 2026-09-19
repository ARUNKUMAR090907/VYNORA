import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
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
    internshipId: {
      type: String,
      required: true,
    },
    internshipTitle: {
      type: String,
      required: true,
    },
    reminderDate: {
      type: String,
      required: true,
    },
    notifyEmail: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', reminderSchema);
