"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstname: "John",
          lastname: "Doe",
          gender: "M",
          birthdate: "1990-01-01",
          adress: "1 rue de la paix",
          city: "Paris",
          zipcode: "75000",
          mail: "toto@gmail.com",
          phone: "0606060606",
          ine: "12345678910",
          first_tutor: 1,
          second_tutor: 2,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users');
  },
};
