import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    portfolio: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  experience: [{
    id: String,
    company: { type: String, default: '' },
    position: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
  }],
  education: [{
    id: String,
    institution: { type: String, default: '' },
    degree: { type: String, default: '' },
    field: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    gpa: { type: String, default: '' },
    achievements: { type: String, default: '' },
  }],
  skillCategories: [{
    id: String,
    title: { type: String, default: 'Technical Skills' },
    skills: [{ type: String }],
  }],
  projects: [{
    id: String,
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: { type: String, default: '' },
    link: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
  }],
  sectionOrder: {
    type: [String],
    default: ['summary', 'experience', 'education', 'skills', 'projects'],
  },
  activeTemplate: {
    type: String,
    default: 'minimalist',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
