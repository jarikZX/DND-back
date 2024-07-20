
module.exports = (sequelize, DataTypes) => {
  const MonsterSpell = sequelize.define('MonsterSpell', {
    spellId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spells',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    monsterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Monsters',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    timestamps: false
  });

  MonsterSpell.associate = (models) => {
    MonsterSpell.belongsTo(models.Spell, { foreignKey: 'spellId' });
    MonsterSpell.belongsTo(models.Monster, { foreignKey: 'monsterId' });
  };

  return MonsterSpell;
};
