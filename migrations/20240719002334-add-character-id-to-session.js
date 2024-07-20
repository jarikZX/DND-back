'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sessions', 'characterId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Characters',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'characterId');
  },
};
