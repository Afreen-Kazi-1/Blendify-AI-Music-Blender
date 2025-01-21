const express = require('express');
const router = express.Router();
const { getSupportPage, submitSupportRequest } = require('../controllers/controller.support');
const { verifyAccessToken} = require('../jwt')


router.get('/', verifyAccessToken, getSupportPage);


router.post('/submit', verifyAccessToken, submitSupportRequest);

module.exports = router;
