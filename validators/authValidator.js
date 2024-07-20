const { body } = require('express-validator');

exports.registerValidator = [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
