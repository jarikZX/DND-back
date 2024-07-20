module.exports = (sequelize, DataTypes) => {
  const Armor = sequelize.define('Armor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['helmet', 'chestplate', 'ring', 'amulet', 'pants', 'gloves', 'boots', 'shield']]
      }
    }
  });

  Armor.associate = (models) => {
    Armor.hasMany(models.Inventory, {
      foreignKey: 'itemId',
      constraints: false,
      scope: {
        itemType: 'armor',
      },
    });
  };

  return Armor;
};