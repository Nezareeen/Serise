const express = require('express');
const router = express.Router();
const controller = require('../controllers/scriptController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, controller.create);
router.get('/', auth, controller.list);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);

module.exports = router;
