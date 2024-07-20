const db = require('../models');

exports.getAllMonsters = async (req, res) => {
  try {
    const monsters = await db.Monster.findAll();
    res.status(200).json(monsters);
  } catch (error) {
    console.error('Error fetching monsters:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMonsterById = async (req, res) => {
  try {
    const { id } = req.params;
    const monster = await db.Monster.findByPk(id);

    if (!monster) {
      return res.status(404).json({ message: 'Monster not found' });
    }

    res.status(200).json(monster);
  } catch (error) {
    console.error('Error fetching monster:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteMonster = async (req, res) => {
  try {
    const { id } = req.params;
    const monster = await db.Monster.findByPk(id);

    if (!monster) {
      return res.status(404).json({ message: 'Monster not found' });
    }

    await monster.destroy();
    res.status(200).json({ message: 'Monster successfully deleted' });
  } catch (error) {
    console.error('Error deleting monster:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
