'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('classes', [
      {
        name: 'A',
        id_class_type: 6,
        scolarity_year: "2022/2023"
      },
      {
        name: 'B',
        id_class_type: 6,
        scolarity_year: "2022/2023"

      },
      {
        name: 'STMG A',
        id_class_type: 12,
        scolarity_year: "2022/2023"
      },
      {
        name: 'C',
        id_class_type: 9,
        scolarity_year: "2022/2023"
      },
      {
        name: 'STI E',
        id_class_type: 10,
        scolarity_year: "2022/2023"
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
