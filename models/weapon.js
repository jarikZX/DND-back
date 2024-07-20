module.exports = (sequelize, DataTypes) => {
  const Weapon = sequelize.define('Weapon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attack: {
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
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Classes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['melee', 'ranged', 'magic']]
      }
    }
  });

  Weapon.associate = (models) => {
    Weapon.hasMany(models.Inventory, {
      foreignKey: 'itemId',
      constraints: false,
      scope: {
        itemType: 'weapon',
      },
    });
  };

  return Weapon;
};