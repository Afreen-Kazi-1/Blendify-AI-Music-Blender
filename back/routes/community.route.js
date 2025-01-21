const express = require('express');
const router = express.Router();
const { verifyAccessToken} = require('../jwt')
const { getUserProjects, getAllPublicProjects } = require('../controllers/controller.community');

router.get('/my-projects', verifyAccessToken, getUserProjects);

router.get('/public-projects', verifyAccessToken, getAllPublicProjects);

module.exports = router;
