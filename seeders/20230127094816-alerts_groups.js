'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alerts_groups', [
        {
          id_alert : 1, 
          id_group : 1
        },
        {
          id_alert : 2, 
          id_group : 2
        },  
        {
          id_alert : 3, 
          id_group : 3
        },
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
