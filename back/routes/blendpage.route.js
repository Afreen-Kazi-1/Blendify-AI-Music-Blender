const express = require('express');
const router = express.Router();
const blendController = require('../controllers/controller.blendpage');
const { verifyAccessToken} = require('../jwt')

router.post('/create-blend', verifyAccessToken, blendController.createBlend);

module.exports = router;
