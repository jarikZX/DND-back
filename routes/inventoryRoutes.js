const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authMiddleware = require('../middlewares/authMiddleware');
const { inventoryValidator } = require('../validators/inventoryValidator');
const { validate } = require('../middlewares/validationMiddleware');

router.use(authMiddleware);

router.post('/', inventoryValidator, validate, inventoryController.addItem);
router.put('/:id', inventoryValidator, validate, inventoryController.updateItem);
router.delete('/:id', inventoryController.deleteItem);
router.get('/:characterId', inventoryController.getItems);

module.exports = router;
