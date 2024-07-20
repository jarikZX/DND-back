const fs = require('fs');
const path = require('path');
const db = require('../models');

async function loadArmorData() {
  const armors = [
    {
      name: 'Перчатки',
      defense: 1,
      description: 'Бабуля смастерила их для меня',
      quality: 'Обычное',
      type: 'gloves',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'gloves.png'),
    },
    {
      name: 'Штанишки',
      defense: 3,
      description: 'Я сделал их сам, главное сам',
      quality: 'Обычное',
      type: 'pants',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'greaves.png'),
    },
    {
      name: 'Шапка',
      defense: 2,
      description: 'Мама говорила, что голову надо держать в тепле, а отец чтобы её не отрубили',
      quality: 'Обычное',
      type: 'helmet',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'helmet.png'),
    },
    {
      name: 'Кольцо всевластия',
      defense: 2,
      description: 'Оно было у трупа какого-то карлика',
      quality: 'Обычное',
      type: 'ring',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'ring-1.png'),
    },
    {
      name: 'Золтое кольцо',
      defense: 1,
      description: 'Его всегда можно заложить если будет туго с деньгами',
      quality: 'Необычное',
      type: 'ring',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'ring-2.png'),
    },
    {
      name: 'Клык',
      defense: 1,
      description: 'Поговаривают что это клык оборотня, но похож на собачий.',
      quality: 'Обычное',
      type: 'amulet',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'amulet.png'),
    },
    {
      name: 'Тонкий доспех',
      defense: 5,
      description: 'Такое чувство, что гвозди крепче',
      quality: 'Обычное',
      type: 'chestplate',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'armor.png'),
    },
    {
      name: 'Охотничье ботинки',
      defense: 2,
      description: 'Простые сапоги охотника, главное не говорите что  я их украл.',
      quality: 'Обычное',
      type: 'boots',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'boots.png'),
    },
  ];

  for (const armorData of armors) {
    const icon = fs.readFileSync(armorData.iconPath);
    await db.Armor.create({ 
      name: armorData.name, 
      defense: armorData.defense, 
      description: armorData.description,
      quality: armorData.quality,
      type: armorData.type,
      icon 
    });
  }

  console.log('Armor data loaded successfully.');
}

loadArmorData().catch((err) => {
  console.error('Error loading armor data:', err);
});
