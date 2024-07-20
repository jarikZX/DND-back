const express = require('express');
const router = express.Router();
const consumableController = require('../controllers/consumableController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.use(authMiddleware); 

router.post('/', upload.single('icon'), consumableController.createConsumable);
router.put('/:id', upload.single('icon'), consumableController.updateConsumable);
router.delete('/:id', consumableController.deleteConsumable);
router.get('/', consumableController.getConsumables);

module.exports = router;
