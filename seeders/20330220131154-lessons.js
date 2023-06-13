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
      {
        lesson_datetime: '2011-01-01 08:00:00',
        id_room: 2,
        id_user: 2,
        id_subject: 2,
        id_timeslot: 2,
        id_class: 2
      },
      {
        lesson_datetime: '2000-01-01 08:00:00',
        id_room: 3,
        id_user: 3,
        id_subject: 3,
        id_timeslot: 3,
        id_class: 3
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
