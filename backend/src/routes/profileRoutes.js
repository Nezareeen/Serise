const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');

router.get('/', controller.getProfile);

module.exports = router;
