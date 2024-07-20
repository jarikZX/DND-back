'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Armors', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    });
    await queryInterface.addColumn('Armors', 'quality', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Armors', 'description');
    await queryInterface.removeColumn('Armors', 'quality');
  }
};
