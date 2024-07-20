const db = require('../models');

exports.createConsumable = async (req, res) => {
  try {
    const { name, effect, description, quality, classId } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const consumable = await db.Consumable.create({ name, effect, description, quality, classId, icon });
    res.status(201).json(consumable);
  } catch (error) {
    console.error('Error creating consumable:', error);
    res.status(500).json({ error: 'Failed to create consumable' });
  }
};

exports.updateConsumable = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, effect, description, quality, classId } = req.body;
    const icon = req.file ? req.file.buffer : null;

    const consumable = await db.Consumable.findByPk(id);
    if (!consumable) {
      return res.status(404).json({ error: 'Consumable not found' });
    }

    await consumable.update({ name, effect, description, quality, classId, icon });
    res.status(200).json(consumable);
  } catch (error) {
    console.error('Error updating consumable:', error);
    res.status(500).json({ error: 'Failed to update consumable' });
  }
};

exports.deleteConsumable = async (req, res) => {
  try {
    const { id } = req.params;

    const consumable = await db.Consumable.findByPk(id);
    if (!consumable) {
      return res.status(404).json({ error: 'Consumable not found' });
    }

    await consumable.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting consumable:', error);
    res.status(500).json({ error: 'Failed to delete consumable' });
  }
};

exports.getConsumables = async (req, res) => {
  try {
    const consumables = await db.Consumable.findAll();
    res.status(200).json(consumables);
  } catch (error) {
    console.error('Error fetching consumables:', error);
    res.status(500).json({ error: 'Failed to fetch consumables' });
  }
};
