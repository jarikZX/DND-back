const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCharacterValidator } = require('../validators/characterValidator');
const { validate } = require('../middlewares/validationMiddleware');

router.use(authMiddleware); 

router.post('/', createCharacterValidator, validate, characterController.createCharacter);
router.put('/:id', createCharacterValidator, validate, characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);
router.get('/', characterController.getCharacters);


router.put('/:id/equipment', characterController.updateCharacterEquipment);

router.post('/:characterId/move-to-inventory', characterController.moveItemToInventory);
router.post('/:characterId/move-to-equipment', characterController.moveItemToEquipment);

router.get('/:id/with-class', characterController.getCharacterWithClass);

module.exports = router;
