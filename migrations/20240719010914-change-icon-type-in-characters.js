'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Characters', 'icon', {
      type: Sequelize.BLOB('long'),
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Characters', 'icon', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
