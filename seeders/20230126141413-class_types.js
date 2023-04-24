'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('class_types', [
      {class_type: 'CP', id_establishment_type: 1},
      {class_type: 'CE1', id_establishment_type: 1},
      {class_type: 'CE2', id_establishment_type: 1},
      {class_type: 'CM1', id_establishment_type: 1},
      {class_type: 'CM2', id_establishment_type: 1},
      {class_type: '6ème', id_establishment_type: 1},
      {class_type: '5ème', id_establishment_type: 1},
      {class_type: '4ème', id_establishment_type: 1},
      {class_type: '3ème', id_establishment_type: 1},
      {class_type: '2nde', id_establishment_type: 1},
      {class_type: '1ère', id_establishment_type: 1},
      {class_type: 'Tle', id_establishment_type: 1},
    ], {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
