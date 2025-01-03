const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String, 
    required: true,
  },
  numberOfProjects: {
    type: Number,
    default: 0, 
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
