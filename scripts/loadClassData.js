const fs = require('fs');
const path = require('path');
const db = require('../models'); 

async function loadClassData() {
  const classes = [
    {
      name: 'knight',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'knight.png'),
    },
    {
      name: 'wizard',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'wizard.png'),
    },
    {
      name: 'hunter',
      iconPath: path.join(__dirname, '..', 'mnt', 'data', 'hunter.png'),
    },
  ];

  for (const classData of classes) {
    const icon = fs.readFileSync(classData.iconPath);
    await db.Class.create({ name: classData.name, icon });
  }

  console.log('Class data loaded successfully.');
}

loadClassData().catch((err) => {
  console.error('Error loading class data:', err);
});
