module.exports = (sequelize, DataTypes) => {
  const Consumable = sequelize.define('Consumable', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    effect: {
      type: DataTypes.STRING,
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
      onDelete: 'SET NULL',
    },
  });

  Consumable.associate = (models) => {
    if (models.Class) {
      Consumable.belongsTo(models.Class, { foreignKey: 'classId', onDelete: 'SET NULL' });
    }
    Consumable.hasMany(models.Inventory, {
      foreignKey: 'itemId',
      constraints: false,
      scope: {
        itemType: 'consumable',
      },
    });
  };

  return Consumable;
};