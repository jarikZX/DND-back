module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    },
  });

  Class.associate = (models) => {
    Class.hasMany(models.Character, { foreignKey: 'classId', onDelete: 'CASCADE' });
    Class.hasMany(models.Spell, { foreignKey: 'classId', onDelete: 'CASCADE' });
  };

  return Class;
};