'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Inventories', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Inventories', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};