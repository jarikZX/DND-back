
module.exports = (sequelize, DataTypes) => {
  const Monster = sequelize.define('Monster', {
    damage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    icon: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Monster.associate = (models) => {
    Monster.belongsToMany(models.Spell, {
      through: models.MonsterSpell,
      foreignKey: 'monsterId',
      otherKey: 'spellId'
    });
  };

  return Monster;
};
