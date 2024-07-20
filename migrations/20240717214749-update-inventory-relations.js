'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Inventories', 'itemType', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['armor', 'weapon', 'consumable']],
      },
    });
    await queryInterface.addColumn('Inventories', 'itemId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Inventories', 'itemType');
    await queryInterface.removeColumn('Inventories', 'itemId');
  },
};
