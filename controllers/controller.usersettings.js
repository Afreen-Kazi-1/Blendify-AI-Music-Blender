const bcrypt = require('bcrypt');
const User = require('../models/user');  
module.exports = {
  getUserSettings: async (req, res, next) => {
    try {
      const { userId } = req.payload; 
      const user = await User.findById(userId).select('username email name profilePicture preferences privacySettings communitySettings');

      if (!user) throw createError.NotFound('User not found.');

      res.status(200).send({ settings: user });
    } catch (error) {
      next(error);
    }
  },


  updateUserSettings: async (req, res, next) => {
    try {
      const { userId } = req.payload; 
      const updates = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
         { 
            $set: 
            {
            preferences: updates.preferences,
            privacySettings: updates.privacySettings,
            communitySettings: updates.communitySettings }
        }, 
        { new: true, runValidators: true }
    );

      if (!updatedUser) throw createError.NotFound('User settings not found.');

      res.status(200).send({ message: 'Settings updated successfully.', settings: updatedUser });
    } catch (error) {
      next(error);
    }
  },

  
  changePassword: async (req, res, next) => {
    try {
      const { userId } = req.payload; 
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        throw createError.BadRequest('Current and new passwords are required.');
      }

      const user = await User.findById(userId);
      if (!user) throw createError.NotFound('User not found.');

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) throw createError.Unauthorized('Current password is incorrect.');

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;

      await user.save();

      res.status(200).send({ message: 'Password changed successfully.' });
    } catch (error) {
      next(error);
    }
  },


  deleteAccount: async (req, res, next) => {
    try {
      const { userId } = req.payload;

      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) throw createError.NotFound('User account not found.');

      res.status(200).send({ message: 'Account deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
};
