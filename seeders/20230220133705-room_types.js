'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('room_types', [
      {room_type: 'Laboratoire'},
      {room_type: 'Danse'},
      {room_type: 'Classique'},
      {room_type: 'Atelier'},
      {room_type: 'Permanence'},
      {room_type: 'Ciné'},
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
