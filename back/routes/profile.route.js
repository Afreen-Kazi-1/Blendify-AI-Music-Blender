const express = require('express');
const router = express.Router();
const { createOrUpdateProfile } = require('../controllers/controller.profile');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/profile-pics'); // Save files in this directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Route to create or update profile with profile picture upload
router.post('/profile', upload.single('profilePicture'), createOrUpdateProfile);

module.exports = router;
