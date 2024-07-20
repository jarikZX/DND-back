'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Classes', 'spellId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Spells',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Classes', 'spellId');
  }
};
