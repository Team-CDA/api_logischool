'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('classes', [
      {
        name: 'SECPA1',
        id_class_type: 1
      },
      {
        name: 'SECPA2',
        id_class_type: 1
      },
      {
        name: 'SECPA3',
        id_class_type: 1
      },
      {
        name: 'SECPA4',
        id_class_type: 1
      },
      {
        name: 'SECPA5',
        id_class_type: 1
      },
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
