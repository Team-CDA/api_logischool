'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('lessons', [
      {
        lesson_datetime: '2021-01-01 08:00:00',
        id_room: 1,
        id_user: 1,
        id_subject: 1,
        id_timeslot: 1,
        id_class: 1
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
