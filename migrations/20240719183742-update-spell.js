'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Spells', 'icon', {
      type: Sequelize.BLOB('long'),
      allowNull: false
    });
    await queryInterface.addColumn('Spells', 'spellType', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('Spells', 'monsterId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Monsters',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.addColumn('Spells', 'classId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Classes',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Spells', 'icon');
    await queryInterface.removeColumn('Spells', 'spellType');
    await queryInterface.removeColumn('Spells', 'monsterId');
    await queryInterface.removeColumn('Spells', 'classId');
  }
};
