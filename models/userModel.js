const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true },
  profilePicture: { type: String },
});

module.exports = mongoose.model('User', userSchema);
