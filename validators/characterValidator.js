const { body } = require('express-validator');

exports.createCharacterValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('level').isInt({ min: 1 }).withMessage('Level must be at least 1'),
  body('classId').isInt().withMessage('Class ID must be an integer'),
  body('strength').isInt({ min: 0 }).withMessage('Strength must be a non-negative integer'),
  body('agility').isInt({ min: 0 }).withMessage('Agility must be a non-negative integer'),
  body('endurance').isInt({ min: 0 }).withMessage('Endurance must be a non-negative integer'),
  body('intellect').isInt({ min: 0 }).withMessage('Intellect must be a non-negative integer'),
  body('background').notEmpty().withMessage('Background is required'),
  body('movementRange').isInt({ min: 0 }).withMessage('Movement Range must be a non-negative integer'),
];
