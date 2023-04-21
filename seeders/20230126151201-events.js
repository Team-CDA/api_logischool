'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events', [
      {
        message: 'Un élève s\'est enfui de l\'établissement, il porte un pull bleu et il a les cheveux courts et un tatouage représentant un chat sur le bras gauche.',
        id_event_type: 3
      },
      {
        message: 'Les réunions parents/profs sont annulées pour cause de Covid-19.',
        id_event_type: 1
      },
      {
        message: 'La cantine est fermée ce jour pour cause de Covid-19.',
        id_event_type: 1
      },
      {
        message: 'Les cours sont annulés aujourd\'hui pour cause de grève des professeurs et du personnel administratif.',
        id_event_type: 1
      },
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
