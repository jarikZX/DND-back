const fs = require('fs');
const path = require('path');
const db = require('../models'); 

async function loadSpellData() {
  const spells = [
    {
      spellName: 'Укус',
      power: 1,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'bite.png'),
      spellType: 'melee',
      monsterIds: [1, 2], 
      classId: null,
    },
    {
      spellName: 'Атака',
      power: 2,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'attack.png'),
      spellType: 'melee',
      monsterIds: [1, 2],
      classId: 1,
    },
    {
      spellName: 'Выстрел',
      power: 3,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'shot.png'),
      spellType: 'ranged',
      monsterIds: [],
      classId: 3, 
    },
    {
      spellName: 'Огненный шар',
      power: 4,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'fireball.png'),
      spellType: 'magic',
      monsterIds: [],
      classId: 2, 
    }
  ];

  for (const spellData of spells) {
    const icon = fs.readFileSync(spellData.iconPath);
    
    const spell = await db.Spell.create({
      spellName: spellData.spellName,
      power: spellData.power,
      icon,
      spellType: spellData.spellType,
      classId: spellData.classId
    });

    for (const monsterId of spellData.monsterIds) {
      await db.MonsterSpell.create({
        spellId: spell.id,
        monsterId,
      });
    }
  }

  console.log('Spell data loaded successfully.');
}

loadSpellData().catch((err) => {
  console.error('Error loading spell data:', err);
});
