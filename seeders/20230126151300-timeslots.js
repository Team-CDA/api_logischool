'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('timeslots', [
      {
        id: 1,
        slot_duration: "60"
      },
      {
        id: 2,
        slot_duration: "30"
      },
      {
        id: 3,
        slot_duration: "15"
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
