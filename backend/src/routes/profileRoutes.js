const express = require('express');
const router = express.Router();
const controller = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, controller.getProfile);

module.exports = router;
