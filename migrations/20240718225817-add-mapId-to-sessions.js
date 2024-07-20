'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Sessions', 'mapId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Maps', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Sessions', 'mapId');
  }
};
