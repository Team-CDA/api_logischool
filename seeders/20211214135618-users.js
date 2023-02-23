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
          ine: "12345678910T",
          first_tutor: 1,
          second_tutor: 2,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        },
        {
          firstname: "Jeanne",
          lastname: "Doe",
          gender: "F",
          birthdate: "1990-01-01",
          adress: "10 rue des bois",
          city: "Marseille",
          zipcode: "13000",
          mail: "toto@does.pinh",
          phone: "0690486933",
          ine: "12345678910R",
          first_tutor: 3,
          second_tutor: 4,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        },
        {
          firstname: "Sergine",
          lastname: "Delattre",
          gender: "F",
          birthdate: "1984-01-01",
          adress: "39 avenue des pompiers",
          city: "Rouens",
          zipcode: "76000",
          mail: "Sergined-gameuse76@lamanu.pinh",
          phone: "0690480909",
          ine: "123456789Y",
          first_tutor: 3,
          second_tutor: 4,
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
