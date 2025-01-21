const createError = require('http-errors');
const Profile = require('../models/profile');

async function createOrUpdateProfile(req, res, next) {
  try {
    const { username, profilePicture, numberOfProjects } = req.body;

    if (!username) {
      throw createError.BadRequest('Username is required.');
    }

    const existingProfile = await Profile.findOne({ username });
    if (existingProfile) {

      existingProfile.profilePicture = profilePicture;
      existingProfile.numberOfProjects = numberOfProjects || existingProfile.numberOfProjects;
      await existingProfile.save();
      return res.status(200).send({ message: 'Profile updated successfully', profile: existingProfile });
    }

    
    const profile = new Profile({ username, profilePicture, numberOfProjects });
    const savedProfile = await profile.save();
    res.status(201).send({ message: 'Profile created successfully', profile: savedProfile });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(createError.BadRequest(error.message));
    } else {
      next(error);
    }
  }
}

module.exports = {
  createOrUpdateProfile,
};
