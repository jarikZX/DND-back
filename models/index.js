const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Character = require('./character')(sequelize, Sequelize);
db.Map = require('./map')(sequelize, Sequelize);
db.Session = require('./session')(sequelize, Sequelize);
db.Inventory = require('./inventory')(sequelize, Sequelize);
db.Spell = require('./spell')(sequelize, Sequelize);
db.Class = require('./class')(sequelize, Sequelize);
db.Armor = require('./armor')(sequelize, Sequelize);
db.Weapon = require('./weapon')(sequelize, Sequelize);
db.Consumable = require('./consumable')(sequelize, Sequelize);
db.Monster = require('./monster')(sequelize, Sequelize);
db.MonsterSpell = require('./monsterSpell')(sequelize, Sequelize); 

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
