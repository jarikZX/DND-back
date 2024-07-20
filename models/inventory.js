module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    slot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['armor', 'weapon', 'consumable']],
      },
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Character, {
      foreignKey: 'characterId',
      onDelete: 'CASCADE',
    });
    Inventory.belongsTo(models.Armor, {
      foreignKey: 'itemId',
      constraints: false,
      as: 'ArmorItem',
    });
    Inventory.belongsTo(models.Weapon, {
      foreignKey: 'itemId',
      constraints: false,
      as: 'WeaponItem',
    });
    Inventory.belongsTo(models.Consumable, {
      foreignKey: 'itemId',
      constraints: false,
      as: 'ConsumableItem',
    });
  };

  return Inventory;
};