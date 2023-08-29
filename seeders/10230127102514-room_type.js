'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('room_types', [
      {room_type: 'classique'},
      {room_type: 'laboratoire'},
      {room_type: 'informatique'},
      {room_type: 'atelier'},
      {room_type: 'intendance'},
      {room_type: 'salle de réunion'},
      {room_type: 'salle des professeurs'},
      {room_type: 'salle de permanence'},
      {room_type: 'gymnase'},
      {room_type: 'permanence'},
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE room_type');

  }
};
