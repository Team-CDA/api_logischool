'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('genders', [
        {gender: 'Homme'},
        {gender: 'Femme'},
        {gender: 'Les deux'},
        {gender: 'Non genré'}
      ], {});
    
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE genders');
  }
};


