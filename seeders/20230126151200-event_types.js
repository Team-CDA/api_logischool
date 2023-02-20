'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('event_types', [
      {
        event_type_name: 'Grève',
      },
      {
        event_type_name: 'Absence',
      },
      {
        event_type_name: 'Evasion',
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
