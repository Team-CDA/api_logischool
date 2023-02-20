'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('groups', [
          {group_name: 'Developpeurs'},
          {group_name: 'Administrateurs'},
          {group_name: 'Enseignants'},
        ], {}
        );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE roles');
  }  
  
};
