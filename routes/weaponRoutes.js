const express = require('express');
const router = express.Router();
const weaponController = require('../controllers/weaponController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.use(authMiddleware);

router.post('/', upload.single('icon'), weaponController.createWeapon);
router.put('/:id', upload.single('icon'), weaponController.updateWeapon);
router.delete('/:id', weaponController.deleteWeapon);
router.get('/', weaponController.getWeapons);

module.exports = router;
