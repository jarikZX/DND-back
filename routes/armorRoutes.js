const express = require('express');
const router = express.Router();
const armorController = require('../controllers/armorController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.use(authMiddleware); 
router.post('/', upload.single('icon'), armorController.createArmor);
router.put('/:id', upload.single('icon'), armorController.updateArmor);
router.delete('/:id', armorController.deleteArmor);
router.get('/', armorController.getArmors);

module.exports = router;
