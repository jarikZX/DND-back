module.exports = (sequelize, DataTypes) => {
  const Map = sequelize.define('Map', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grid: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    objects: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icons: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    textures: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Map.associate = (models) => {
    Map.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Map.hasMany(models.Session, {
      foreignKey: 'mapId',
    });
  };

  return Map;
};
