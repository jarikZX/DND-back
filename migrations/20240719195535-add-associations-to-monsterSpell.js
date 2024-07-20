'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addConstraint('MonsterSpells', {
      fields: ['spellId'],
      type: 'foreign key',
      name: 'fk_monsterSpells_spells',
      references: {
        table: 'Spells',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('MonsterSpells', {
      fields: ['monsterId'],
      type: 'foreign key',
      name: 'fk_monsterSpells_monsters',
      references: {
        table: 'Monsters',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('MonsterSpells', 'fk_monsterSpells_spells');

    await queryInterface.removeConstraint('MonsterSpells', 'fk_monsterSpells_monsters');
  }
};
