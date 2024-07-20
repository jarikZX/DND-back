
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
        allowNull: false
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
      },
      background: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      model: {
        type: Sequelize.STRING,
        allowNull: true
      },
      movementRange: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Characters');
  }
};
