const express = require('express');
const router = express.Router();
const controller = require('../controllers/energyController');

router.post('/', controller.log);

module.exports = router;
