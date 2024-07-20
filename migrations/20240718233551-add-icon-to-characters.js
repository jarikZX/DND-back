'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'icon', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'path/to/default/icon.png', 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Characters', 'icon');
  }
};
