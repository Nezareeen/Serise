const express = require('express');
const router = express.Router();
const controller = require('../controllers/simulationController');

router.post('/', controller.run);

module.exports = router;
