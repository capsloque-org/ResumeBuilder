import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  resumeData: {
    type: Object,
    default: null,
  },
  activeTemplate: {
    type: String,
    default: 'minimalist',
  },
}, {
  timestamps: true // This automatically handles createdAt and updatedAt
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
