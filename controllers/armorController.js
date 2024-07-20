const db = require('../models');

exports.createArmor = async (req, res) => {
  try {
    const { name, defense, description, quality } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const armor = await db.Armor.create({ name, defense, description, quality, icon, type });
    res.status(201).json(armor);
  } catch (error) {
    console.error('Error creating armor:', error);
    res.status(500).json({ error: 'Failed to create armor' });
  }
};

exports.updateArmor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, defense, description, quality } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const armor = await db.Armor.findByPk(id);
    if (!armor) {
      return res.status(404).json({ error: 'Armor not found' });
    }

    await armor.update({ name, defense, description, quality, icon, type });
    res.status(200).json(armor);
  } catch (error) {
    console.error('Error updating armor:', error);
    res.status(500).json({ error: 'Failed to update armor' });
  }
};

exports.deleteArmor = async (req, res) => {
  try {
    const { id } = req.params;

    const armor = await db.Armor.findByPk(id);
    if (!armor) {
      return res.status(404).json({ error: 'Armor not found' });
    }

    await armor.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting armor:', error);
    res.status(500).json({ error: 'Failed to delete armor' });
  }
};

exports.getArmors = async (req, res) => {
  try {
    const armors = await db.Armor.findAll();
    res.status(200).json(armors);
  } catch (error) {
    console.error('Error fetching armors:', error);
    res.status(500).json({ error: 'Failed to fetch armors' });
  }
};
