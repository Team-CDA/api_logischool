'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('classes', [
      {name: 'SECPA1'},
      {name: 'SECPA2'},
      {name: 'SECPA3'},
      {name: 'SECPA4'},
      {name: 'SECPA5'},
      {name: 'SECPA6'},
      {name: 'SECPA7'},
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
