'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('referent_teachers', [
      {
        id_class: 1,
        id_user: 1
      },
      {
        id_class: 2,
        id_user: 2
      },
      {
        id_class: 3,
        id_user: 3
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
