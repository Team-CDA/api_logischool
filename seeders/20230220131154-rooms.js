'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [
      {room : 'A01'},
      {room : 'A02'},
      {room : 'A05'},
      {room : 'B01'},
      {room : 'B02'},
      {room : 'B03'},
      {room : 'C01'},
      {room : 'C02'},
      {room : 'C02'},
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
