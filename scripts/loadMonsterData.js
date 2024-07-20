const fs = require('fs');
const path = require('path');
const db = require('../models'); 

async function loadMonsterData() {
  const monsters = [
    {
      damage: 2,
      health: 10,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'goblin.png'),
      type: 'оркоид',
      name: 'гобла',
    },
    {
      damage: 3,
      health: 6,
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'skelet.png'),
      type: 'нежить',
      name: 'Костяшка',
    },
  ];

  for (const monsterData of monsters) {
    const icon = fs.readFileSync(monsterData.iconPath);
    await db.Monster.create({
      damage: monsterData.damage,
      health: monsterData.health,
      icon,
      type: monsterData.type,
      name: monsterData.name,
    });
  }

  console.log('Monster data loaded successfully.');
}

loadMonsterData().catch((err) => {
  console.error('Error loading monster data:', err);
});
