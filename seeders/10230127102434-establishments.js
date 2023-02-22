'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishments', [
      {name: 'Lycée'},
      {name: 'Collège'},
      {name: 'Primaire'},
      {name: 'Maternelle'},
      {name: 'Crèche'},
      {name: 'Autre'}
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE establishments');
  }
};
