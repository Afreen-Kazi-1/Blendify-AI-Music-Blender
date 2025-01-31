const express = require('express');
const router = express.Router();
const multer = require('multer')
const blendController = require('../controllers/controller.blendpage');
const { verifyAccessToken} = require('../jwt')

const upload = multer({ dest: 'uploads/' })
router.post('/create-blend', verifyAccessToken, blendController.createBlend);

module.exports = router;
