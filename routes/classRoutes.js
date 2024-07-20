const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); 

router.get('/', classController.getAllClasses);

router.get('/:id', classController.getClassById);
module.exports = router;