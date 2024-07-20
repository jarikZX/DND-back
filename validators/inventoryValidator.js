const { body } = require('express-validator');

exports.inventoryValidator = [
  body('characterId').isInt().withMessage('Character ID must be an integer'),
  body('slot').isInt().withMessage('Slot must be an integer'),
  body('itemType').isIn(['armor', 'weapon', 'consumable']).withMessage('Item type must be one of: armor, weapon, consumable'),
  body('itemId').isInt().withMessage('Item ID must be an integer'),
];
