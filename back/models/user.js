const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String }, // URL to profile picture
    preferences: {
      autoSaveMashups: { type: Boolean, default: false },
      preferredFileFormat: { type: String, enum: ['mp3', 'wav', 'mp4'], default: 'mp3' },
      cloudStorageLink: { type: String },
    },
    privacySettings: {
      isAccountPrivate: { type: Boolean, default: false },
      emailVerificationEnabled: { type: Boolean, default: true },
      recentActivityLog: [{ action: String, timestamp: Date }],
    },
    communitySettings: {
      commentsEnabled: { type: Boolean, default: true },
      collaborationInvitations: { type: Boolean, default: true },
      mashupVisibility: { type: String, enum: ['public', 'private'], default: 'public' },
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mashup' }],
  }, { timestamps: true });


UserSchema.pre('save', async function (next){
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(this.password, salt)
    this.password = hashedpassword
    next()
    
  } catch (error) {
    next(error)
    
  }
})

UserSchema.methods.isValidPassword = async function (password){
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
    
  }
}
    
const User = mongoose.model('user', UserSchema)
module.exports = User 