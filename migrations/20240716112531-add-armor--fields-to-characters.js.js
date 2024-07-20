'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Armors', 'type', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['helmet', 'chestplate', 'ring', 'amulet', 'pants', 'gloves', 'boots', 'shield']]
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Armors', 'type');
  }
};
