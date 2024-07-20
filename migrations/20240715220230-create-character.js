'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      agility: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      endurance: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      intellect: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      background: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      model: {
        type: Sequelize.BLOB('long'),
        allowNull: true
      },
      movementRange: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      helmet: Sequelize.STRING,
      chestplate: Sequelize.STRING,
      ring1: Sequelize.STRING,
      ring2: Sequelize.STRING,
      amulet: Sequelize.STRING,
      pants: Sequelize.STRING,
      gloves: Sequelize.STRING,
      boots: Sequelize.STRING,
      weapon: Sequelize.STRING,
      shield: Sequelize.STRING,
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
    await queryInterface.dropTable('Characters');
  }
};
