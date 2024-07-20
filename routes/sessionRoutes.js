const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); 

router.post('/', sessionController.createSession);
router.post('/:id/join', sessionController.joinSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.leaveSession);
router.get('/:id', sessionController.getSessionById);
router.get('/', sessionController.getSessions);

module.exports = router;