module.exports = (sequelize, DataTypes) => {
  const Spell = sequelize.define('Spell', {
    spellName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    power: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    icon: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    spellType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Spell.associate = (models) => {

    Spell.belongsTo(models.Monster, {
      foreignKey: 'monsterId',
      onDelete: 'CASCADE',
    });
    Spell.belongsTo(models.Class, {
      foreignKey: 'classId',
      onDelete: 'CASCADE',
    });
  };

  return Spell;
};
