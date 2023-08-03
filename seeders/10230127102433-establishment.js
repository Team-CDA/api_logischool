'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishments', [
      {
        name: 'LA MANU',
        id_establishment_type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE establishments');
  }
};
