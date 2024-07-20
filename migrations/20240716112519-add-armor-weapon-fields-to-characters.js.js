'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Weapons', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['melee', 'ranged', 'magic']]
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Weapons', 'type');
  }
};
