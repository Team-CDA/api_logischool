"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("examplePassword", 10);
    await queryInterface.bulkInsert(
      "liaison_books",
      [
        {
          date_message: new Date(),
          date_response: new Date(),
          message: "Exemple de message 1",
          message_object: "Objet 1",
          response: "Réponse 1",
          id_initiator: 3,
          id_parent: 2,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_message: new Date(),
          date_response: new Date(),
          message: "Exemple de message 2",
          message_object: "Objet 2",
          response: "Réponse 2",
          id_initiator: 3,
          id_parent: 2,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_message: new Date(),
          date_response: new Date(),
          message: "Exemple de message 3",
          message_object: "Objet 3",
          response: "",
          id_initiator: 3,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query("TRUNCATE TABLE liaison_books");
  },
};