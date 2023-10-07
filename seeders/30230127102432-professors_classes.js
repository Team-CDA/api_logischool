"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "professors_classes",
      [
        { id_professor: 26, id_class: 1 },
        { id_professor: 26, id_class: 2 },
        { id_professor: 26, id_class: 3 },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("TRUNCATE TABLE professors_classes");
  },
};
