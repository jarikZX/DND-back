module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Maps', 'objects', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '{}',
    });
    await queryInterface.addColumn('Maps', 'icons', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '{}',
    });
    await queryInterface.addColumn('Maps', 'textures', {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: '{}',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Maps', 'objects');
    await queryInterface.removeColumn('Maps', 'icons');
    await queryInterface.removeColumn('Maps', 'textures');
  }
};