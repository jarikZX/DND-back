const db = require('../models');


exports.getProfile = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.user.id, {
      include: [
        {
          model: db.Character,
          include: [db.Inventory]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      Characters: user.Characters.map(character => ({
        ...character.toJSON(),
        classId: character.classId
      }))
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const user = await db.User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
};
