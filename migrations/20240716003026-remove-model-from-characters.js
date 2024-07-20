'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Characters', 'model');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'model', {
      type: Sequelize.BLOB('long'),
      allowNull: true,
    });
  }
};
