const fs = require('fs');
const path = require('path');
const db = require('../models');

async function loadWeaponData() {
  const weapons = [
    {
      name: 'Меч',
      attack: 3,
      description: 'Для самозащиты самое то главное не носить без ножен',
      quality: 'Обычный',
      classId: 1, 
      type: 'melee',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'sword.png'),
    },
    {
      name: 'Лук',
      attack: 8,
      description: 'Снова подтягивать тетиву',
      quality: 'Обычный',
      classId: 3, 
      type: 'ranged',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'bow.png'),
    },
    {
      name: 'Арбалет',
      attack: 8,
      description: 'Ему очень много лет, вроде ещё мой прадед им пользовался',
      quality: 'Обычный',
      classId: 3, 
      type: 'ranged',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'crossbow.png'),
    },
    {
      name: 'Длинный меч',
      attack: 10,
      description: 'Хорошая "Танкрывалка"',
      quality: 'Обычный',
      classId: 1, 
      type: 'melee',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'long-sword-5747418.png'),
    },
    {
      name: 'Карты таро',
      attack: 1,
      description: 'Могут предсказывать судьбу, как оружие конечно сомнительно',
      quality: 'Обычный',
      classId: 2, 
      type: 'magic',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'magic-cards.png'),
    },
    {
      name: 'Щит',
      attack: 2,
      description: 'Ну, а что ударить щитом тоже можно',
      quality: 'Обычный',
      classId: 1, 
      type: 'melee',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'shield.png'),
    },
    {
      name: 'Посох',
      attack: 2,
      description: 'Раз в год и палка стреляет',
      quality: 'Обычный',
      classId: 2,
      type: 'magic',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'staff.png'),
    },
  ];

  for (const weaponData of weapons) {
    const icon = fs.readFileSync(weaponData.iconPath);
    await db.Weapon.create({ 
      name: weaponData.name, 
      attack: weaponData.attack, 
      description: weaponData.description,
      quality: weaponData.quality,
      classId: weaponData.classId,
      type: weaponData.type,
      icon 
    });
  }

  console.log('Weapon data loaded successfully.');
}

loadWeaponData().catch((err) => {
  console.error('Error loading weapon data:', err);
});
