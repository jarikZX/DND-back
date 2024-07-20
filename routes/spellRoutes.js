const express = require('express');
const router = express.Router();
const spellController = require('../controllers/spellController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); 

router.get('/character/:characterId', spellController.getSpellsForCharacter);
router.get('/monster/:monsterId', spellController.getSpellsForMonster);

module.exports = router;