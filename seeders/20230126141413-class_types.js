'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('class_types', [
      {class_type: 'CP'},
      {class_type: 'CE1'},
      {class_type: 'CE2'},
      {class_type: 'CM1'},
      {class_type: 'CM2'},
      {class_type: '6ème'},
      {class_type: '5ème'},
      {class_type: '4ème'},
      {class_type: '3ème'},
      {class_type: '2nde'},
      {class_type: '1ère'},
      {class_type: 'Tle'},
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
