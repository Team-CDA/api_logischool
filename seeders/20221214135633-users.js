"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("examplePassword", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstname: "Luke",
          lastname: "Skywalker",
          gender: "M",
          birthdate: "1990-01-01",
          adress: "1 rue de la paix",
          city: "Paris",
          zipcode: "75000",
          email: "luke@gmail.com",
          ine: "1234567891C",
          password: passwordHash,
          phone: "0606060606",
          // id_class: 1,
          // id_establishment : 1,
          id_role: 3,
          first_tutor: 2,
          second_tutor: 3,
        },
        {
          firstname: "Anakin",
          lastname: "Skywalker",
          gender: "M",
          birthdate: "1988-01-31",
          adress: "10 rue des bois",
          city: "Marseille",
          zipcode: "13000",
          email: "anakin@gmail.com",
          password: passwordHash,
          phone: "0690486933",
          // id_establishment : 1,
          // id_class : 1,
          id_role: 2,
        },
        {
          firstname: "Padmé",
          lastname: "Amidala",
          gender: "F",
          birthdate: "1984-09-11",
          adress: "3 rue du Pont",
          city: "Lyon",
          zipcode: "69000",
          email: "padme@gmail.com",
          password: passwordHash,
          phone: "0676341346",
          // id_establishment : 1,
          //id_class: 1,
          id_role: 2,
        },
        {
          firstname: "Maitre",
          lastname: "Yoda",
          gender: "M",
          birthdate: "1984-06-29",
          adress: "4 chemin des pres",
          city: "Rouen",
          zipcode: "76000",
          email: "yoda@gmail.com",
          password: passwordHash,
          phone: "0712345678",
          // id_establishment : 1,
          //id_class: 1,
          id_role: 4,
        },
        {
          firstname: "Obi-Wan",
          lastname: "Kenobi",
          gender: "M",
          birthdate: "1980-03-03",
          adress: "150 avenue des champs",
          city: "Bordeaux",
          zipcode: "33000",
          email: "obiwan@gmail.com",
          password: passwordHash,
          phone: "0789098754",
          ine: "1234567891E",
          // id_establishment : 1,
          //id_class: 1,
          id_role: 5,
          id_status: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users');
  },
};
