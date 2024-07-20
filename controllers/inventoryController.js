const db = require('../models');

exports.addItem = async (req, res) => {
  try {
    const { characterId, slot, itemType, itemId } = req.body;
    const inventory = await db.Inventory.create({ characterId, slot, itemType, itemId });
    res.status(201).json(inventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { slot, itemType, itemId } = req.body;
    const inventory = await db.Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ message: 'Предмет не найден' });
    }

    const updatedInventory = await inventory.update({ slot, itemType, itemId });
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const inventory = await db.Inventory.findByPk(id);

    if (!inventory) {
      return res.status(404).json({ message: 'Предмет не найден' });
    }

    await inventory.destroy();
    res.status(200).json({ message: 'Предмет успешно удален' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { characterId } = req.params;
    const items = await db.Inventory.findAll({
      where: { characterId },
      include: [
        { model: db.Armor, as: 'ArmorItem', attributes: ['id', 'name', 'defense', 'description', 'quality', 'icon'] },
        { model: db.Weapon, as: 'WeaponItem', attributes: ['id', 'name', 'attack', 'description', 'quality', 'icon'] },
        { model: db.Consumable, as: 'ConsumableItem', attributes: ['id', 'name', 'effect', 'description', 'quality', 'icon'] }
      ]
    });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
