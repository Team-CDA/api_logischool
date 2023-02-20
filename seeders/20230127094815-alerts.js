'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alerts', [
    {
      message : "Manifestation des enseignants",
      id_alert_type : 1
    },
    {
      message : "Manifestation des parents",
      id_alert_type : 1
    },
    {
      message : "Manifestation des élèves",
      id_alert_type : 1
    }
    ], {});
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
