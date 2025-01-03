const express = require('express');
const router = express.Router();
const { verifyAccessToken } = require('../jwt')
const UserSettingsController = require('../controllers/controller.usersettings')

router.get('/settings', verifyAccessToken, UserSettingsController.getUserSettings)

router.put('/settings', verifyAccessToken, UserSettingsController.updateUserSettings)

router.put('/settings/change-password', verifyAccessToken, UserSettingsController.changePassword)

router.delete('/settings/delete', verifyAccessToken, UserSettingsController.deleteAccount)

module.exports = router;
