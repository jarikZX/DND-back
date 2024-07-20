const db = require('../models');

exports.getSpellsForCharacter = async (req, res) => {
  try {
    const { characterId } = req.params;
    const character = await db.Character.findByPk(characterId, {
      include: [{
        model: db.Class,
        include: [db.Spell]
      }]
    });

    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }

    const spells = character.Class.Spells;
    res.status(200).json(spells);
  } catch (error) {
    console.error('Error fetching spells for character:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};;

exports.getSpellsForMonster = async (req, res) => {
  try {
    const { monsterId } = req.params;
    const monsterSpells = await db.MonsterSpell.findAll({
      where: { monsterId },
      include: [db.Spell]
    });
    const spells = monsterSpells.map(ms => ms.Spell);
    res.status(200).json(spells);
  } catch (error) {
    console.error('Error fetching spells for monster:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};