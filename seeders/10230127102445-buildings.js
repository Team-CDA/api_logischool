'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        name: 'A',
        id_establishment: 1
      },
      {
        name: 'B',
        id_establishment: 1
      },
      {
        name: 'C',
        id_establishment: 1
      },
      {
        name: 'D',
        id_establishment: 1
      },
      {
        name: 'A',
        id_establishment: 2
      },
      {
        name: 'B',
        id_establishment: 2
      }
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.sequelize.query('TRUNCATE TABLE buildings');
  }
};
