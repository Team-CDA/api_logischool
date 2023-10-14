'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishments', [
      {
        name: 'LA MANU',
        id_establishment_type: 1,
        address: '70 rue des jacobins',
        city: 'Amiens',
        zip_code: '80000',
        phone: '0322113344',
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
