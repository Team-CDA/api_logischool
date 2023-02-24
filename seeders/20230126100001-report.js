'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reports', [
      {
        report_date: '2022-01-01',
        id_user: 1,
        id_report_type: 1,
        report_date: new Date(),
        report_text: 'greve de train',
      },
      {
        report_date: '2000-01-01',
        id_user: 2,
        id_report_type: 2,
        report_date: new Date(),
        report_text: 'blocus d\'éléves',
      },
      {
        report_date: '2010-01-01',
        id_user: 3,
        id_report_type: 3,
        report_date: new Date(),
        report_text: 'reforme des retraites',
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
