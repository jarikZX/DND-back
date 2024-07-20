const express = require('express');
const router = express.Router();
const monsterController = require('../controllers/monsterController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', monsterController.getAllMonsters);
router.get('/:id', monsterController.getMonsterById);
router.delete('/:id', monsterController.deleteMonster);

module.exports = router;
