'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Classes',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Characters', 'classId');
  }
};
