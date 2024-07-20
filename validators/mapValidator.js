const { body } = require('express-validator');

exports.createMapValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('grid').notEmpty().withMessage('Grid is required'),
    body('objects').isJSON().withMessage('Objects must be a valid JSON'),
    body('icons').isJSON().withMessage('Icons must be a valid JSON'),
    body('textures').isJSON().withMessage('Textures must be a valid JSON')
];
