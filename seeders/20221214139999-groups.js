'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('groups', [
          {group_name: 'Administration'},
          {group_name: 'Enseignants'},
          {group_name: 'Encadrants'},
          {group_name: 'Elèves'},
          {group_name: 'Parents'},
        ], {}
        );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE roles');
  }  
  
};
