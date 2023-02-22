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
      {
        name: 'D',
        id_establishment: 4
      },
      {
        name: 'E',
        id_establishment: 5
      },
      {
        name: 'F',
        id_establishment: 6
      }
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.sequelize.query('TRUNCATE TABLE buildings');
  }
};
