import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: String,
  email: String,
  yearOfStudy: String,
  degree: String,
  university: String,
  location: String,
  gpa: String,
  expectedGraduation: String,
  presentPursuing: String,
  locationText: String,
  graduationYearDropdown: String,
  skills: [String],
  interests: [String],
  projects: [{
    title: String,
    description: String,
    technologies: [String]
  }],
  experiences: [{
    title: String,
    company: String,
    duration: String,
    description: String
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: String,
    credentialId: String
  }]
});

export default mongoose.model('Profile', profileSchema);
