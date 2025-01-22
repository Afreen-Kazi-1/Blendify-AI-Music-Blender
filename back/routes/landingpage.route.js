const express = require('express');
const router = express.Router();
const { getLandingPage } = require('../controllers/controller.landingpage');
const { verifyAccessToken} = require('../jwt')

router.get('/', verifyAccessToken, getLandingPage);

module.exports = router;
