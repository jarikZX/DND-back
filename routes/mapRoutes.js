
const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validationMiddleware');
const { createMapValidator } = require('../validators/mapValidator');

router.post('/', authMiddleware, createMapValidator, validate, mapController.createMap);
router.get('/', authMiddleware, mapController.getMaps);
router.get('/:id', authMiddleware, mapController.getMap);
router.put('/:id', authMiddleware, mapController.updateMap);
router.delete('/:id', authMiddleware, mapController.deleteMap);
router.get('/:id/png', authMiddleware, mapController.saveMapAsPNG);

module.exports = router;
