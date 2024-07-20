'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Characters', 'helmet', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'chestplate', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'ring1', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'ring2', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'amulet', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'pants', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'gloves', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'boots', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Armors',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'weapon', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Weapons',
        key: 'id',
      },
    });
    await queryInterface.addColumn('Characters', 'shield', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Weapons',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Characters', 'helmet');
    await queryInterface.removeColumn('Characters', 'chestplate');
    await queryInterface.removeColumn('Characters', 'ring1');
    await queryInterface.removeColumn('Characters', 'ring2');
    await queryInterface.removeColumn('Characters', 'amulet');
    await queryInterface.removeColumn('Characters', 'pants');
    await queryInterface.removeColumn('Characters', 'gloves');
    await queryInterface.removeColumn('Characters', 'boots');
    await queryInterface.removeColumn('Characters', 'weapon');
    await queryInterface.removeColumn('Characters', 'shield');
  },
};