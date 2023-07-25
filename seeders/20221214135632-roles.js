"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "roles",
      [
        { role: "admin" },
        { role: "parent" },
        { role: "élève" },
        { role: "proviseur" },
        { role: "Professeur" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("TRUNCATE TABLE roles");
  },
};


