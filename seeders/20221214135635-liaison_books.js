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
          date_message: new Date('2023-08-20T12:00:00Z'),
          date_response: new Date('2023-08-21T14:00:00Z'),
          message: "Votre enfant a été particulièrement participatif en classe aujourd'hui.",
          message_object: "Participation en classe",
          response: "Merci pour cette information. C'est très encourageant!",
          id_initiator: 3,
          id_parent: 2,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_message: new Date('2023-08-22T09:00:00Z'),
          date_response: new Date('2023-08-23T10:00:00Z'),
          message: "Je voudrais vous informer que nous aurons un contrôle de mathématiques la semaine prochaine.",
          message_object: "Contrôle de mathématiques à venir",
          response: "Merci de nous avoir informés. Nous veillerons à ce que notre enfant soit bien préparé.",
          id_initiator: 3,
          id_parent: 2,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date_message: new Date('2023-08-24T15:00:00Z'),
          date_response: new Date(),
          message: "Il semble que votre enfant ait oublié son cahier de devoirs en classe aujourd'hui.",
          message_object: "Oubli de cahier de devoirs",
          response: "",
          id_initiator: 3,
          id_parent: 2,
          id_student: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('liaison_books', null, {});
  },
};
