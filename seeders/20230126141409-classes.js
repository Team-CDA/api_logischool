'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('People', [
      {},
      {},
      {},
      {},
      

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
 // await queryInterface.sequelize.query('TRUNCATE TABLE classes');
  }
};
