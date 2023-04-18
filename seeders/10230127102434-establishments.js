'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishments', [
      {name: 'La Manu', id_establishment_type: 1},
      {name: 'Saint Martin', id_establishment_type: 2},
      {name: 'Louis Thuillier', id_establishment_type: 3},
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE establishments');
  }
};
