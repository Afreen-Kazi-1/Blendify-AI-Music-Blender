const express = require('express');
const router = express.Router();
const { createOrUpdateProfile } = require('../controllers/controller.profile');

router.post('/profile', createOrUpdateProfile);

module.exports = router;
