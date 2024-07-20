const db = require('../models');

exports.getAllClasses = async (req, res) => {
  try {
    const classes = await db.Class.findAll();
    res.status(200).json(classes);
  } catch (error) {
    console.error('Failed to fetch classes:', error);
    res.status(500).json({ error: 'Failed to fetch classes' });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const classData = await db.Class.findByPk(id);
    if (!classData) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json(classData);
  } catch (error) {
    console.error('Failed to fetch class:', error);
    res.status(500).json({ error: 'Failed to fetch class' });
  }
};