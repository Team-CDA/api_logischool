'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('buildings', [
      {
        name: 'A',
        id_establishment: 1
      },
      {
        name: 'B',
        id_establishment: 2
      },
      {
        name: 'C',
        id_establishment: 3
      },
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.sequelize.query('TRUNCATE TABLE buildings');
  }
};
