'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishment_types', [
      {name: 'Lycée'},
      {name: 'Collège'},
      {name: 'Ecole'},

    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE establishment_types');
  }
};
