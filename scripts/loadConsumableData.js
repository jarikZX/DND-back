const fs = require('fs');
const path = require('path');
const db = require('../models'); 

async function loadConsumableData() {
  const consumables = [
    {
      name: 'Зелье лечения',
      effect: 'Восстанавливает 5 очков здоровья',
      description: 'Оказывается из подорожника тоже можно делать зелье',
      quality: 'Обычное',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'health-potion.png'),
      classId: null, 
    },
    {
      name: 'Зелье невидимости',
      effect: 'Делает использовавшего его невидимым',
      description: 'Враг не увидит тебя, конечно можно использовать и для подглядывания',
      quality: 'Обычное',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'invisibility-potion.png'),
      classId: null, 
    },
    {
      name: 'Колчан со стрелами',
      effect: 'Даёт возможность носить стрелы аккуратно',
      description: 'Злостный разработчик не реализовал механику стрел',
      quality: 'Обычное',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'quiver.png'),
      classId: 3, 
    },
  ];

  for (const consumableData of consumables) {
    const icon = fs.readFileSync(consumableData.iconPath);
    await db.Consumable.create({ 
      name: consumableData.name, 
      effect: consumableData.effect, 
      description: consumableData.description,
      quality: consumableData.quality,
      icon,
      classId: consumableData.classId
    });
  }

  console.log('Consumable data loaded successfully.');
}

loadConsumableData().catch((err) => {
  console.error('Error loading consumable data:', err);
});
