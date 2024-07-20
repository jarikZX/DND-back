'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Inventories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Characters',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      slot: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      itemName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Inventories');
  }
};
