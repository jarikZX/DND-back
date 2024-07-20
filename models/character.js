module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agility: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endurance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    intellect: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    background: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    movementRange: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    helmet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    chestplate: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    ring1: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    ring2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    amulet: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    pants: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    gloves: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    boots: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    },
    weapon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Weapons',
        key: 'id',
      },
    },
    shield: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Weapons',
        key: 'id',
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  });

  Character.associate = (models) => {
    Character.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Character.belongsTo(models.Class, { foreignKey: 'classId', onDelete: 'CASCADE' });
    Character.hasOne(models.Inventory, { foreignKey: 'characterId', onDelete: 'CASCADE' });
    Character.belongsTo(models.Armor, { as: 'Helmet', foreignKey: 'helmet' });
    Character.belongsTo(models.Armor, { as: 'Chestplate', foreignKey: 'chestplate' });
    Character.belongsTo(models.Armor, { as: 'Ring1', foreignKey: 'ring1' });
    Character.belongsTo(models.Armor, { as: 'Ring2', foreignKey: 'ring2' });
    Character.belongsTo(models.Armor, { as: 'Amulet', foreignKey: 'amulet' });
    Character.belongsTo(models.Armor, { as: 'Pants', foreignKey: 'pants' });
    Character.belongsTo(models.Armor, { as: 'Gloves', foreignKey: 'gloves' });
    Character.belongsTo(models.Armor, { as: 'Boots', foreignKey: 'boots' });
    Character.belongsTo(models.Weapon, { as: 'Weapon', foreignKey: 'weapon' });
    Character.belongsTo(models.Armor, { as: 'Shield', foreignKey: 'shield' });
  };

  return Character;
};
