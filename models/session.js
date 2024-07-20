
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Session.associate = (models) => {
    Session.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Session.belongsTo(models.Map, {
      foreignKey: 'mapId',
      onDelete: 'CASCADE',
    });
    Session.belongsToMany(models.User, {
      through: 'SessionUsers',
      as: 'participants',
      foreignKey: 'sessionId',
    });
    Session.belongsTo(models.Character, {
      foreignKey: 'characterId',
      as: 'character',
      onDelete: 'SET NULL',
    });
  };

  return Session;
};
