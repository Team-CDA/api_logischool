'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {room_type: 'laboratoire'},
      {room_type: 'informatique'},
      {room_type: 'classique'},
      {room_type: 'atelier'},
      {room_type: 'atelier'},
      {room_type: 'permanence'},
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE room_type');

  }
};
