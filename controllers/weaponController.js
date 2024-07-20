const db = require('../models');

exports.createWeapon = async (req, res) => {
  try {
    const { name, attack, description, quality, classId } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const weapon = await db.Weapon.create({ name, attack, description, quality, classId, icon, type });
    res.status(201).json(weapon);
  } catch (error) {
    console.error('Error creating weapon:', error);
    res.status(500).json({ error: 'Failed to create weapon' });
  }
};

exports.updateWeapon = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, attack, description, quality, classId } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const weapon = await db.Weapon.findByPk(id);
    if (!weapon) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    await weapon.update({ name, attack, description, quality, classId, icon, type });
    res.status(200).json(weapon);
  } catch (error) {
    console.error('Error updating weapon:', error);
    res.status(500).json({ error: 'Failed to update weapon' });
  }
};

exports.deleteWeapon = async (req, res) => {
  try {
    const { id } = req.params;

    const weapon = await db.Weapon.findByPk(id);
    if (!weapon) {
      return res.status(404).json({ error: 'Weapon not found' });
    }

    await weapon.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting weapon:', error);
    res.status(500).json({ error: 'Failed to delete weapon' });
  }
};

exports.getWeapons = async (req, res) => {
  try {
    const weapons = await db.Weapon.findAll();
    res.status(200).json(weapons);
  } catch (error) {
    console.error('Error fetching weapons:', error);
    res.status(500).json({ error: 'Failed to fetch weapons' });
  }
};
