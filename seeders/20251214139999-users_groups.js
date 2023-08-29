'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users_groups', [
          {
            id_group: 4,
            id_user: 1
          },
          {
            id_group: 5,
            id_user: 2
          },
          {
            id_group: 5,
            id_user: 3
          },
        ], {}
        );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users_groups');
  }  
  
};
