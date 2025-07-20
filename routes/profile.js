import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router(); // ✅ define this before using router.post

// Save profile route
router.post('/save-profile', async (req, res) => {
  try {
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ message: 'Error saving profile.' });
  }
});

export default router;
