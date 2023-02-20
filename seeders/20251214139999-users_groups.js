'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users_groups', [
          {
            id_group: 1,
            id_user: 1
          },
        ], {}
        );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users_groups');
  }  
  
};
