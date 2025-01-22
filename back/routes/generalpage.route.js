const express = require('express');
const router = express.Router();
const { getAboutPage, getHelpPage } = require('../controllers/controller.generalpages');
const { verifyAccessToken} = require('../jwt')

router.get('/about', verifyAccessToken, getAboutPage);
router.get('/help', verifyAccessToken, getHelpPage);

module.exports = router;
