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
          // id_role : 1,
          // id_status : 1
        },
        {
          firstname: "Jeanne",
          lastname: "Doe",
          gender: "F",
          birthdate: "1988-01-31",
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
          birthdate: "1984-09-11",
          adress: "3 rue du Pont",
          city: "Lyon",
          zipcode: "69000",
          mail: "Sergined-gameuse76@lamanu.pinh",
          phone: "0676341346",
          ine: "123456789Y",
          first_tutor: 5,
          second_tutor: 6,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        },
        {
          firstname: "Julien",
          lastname: "Montagne",
          gender: "M",
          birthdate: "1984-06-29",
          adress: "4 chemin des pres",
          city: "Rouen",
          zipcode: "76000",
          mail: "LeMontagnard@lamanu.pinh",
          phone: "0712345678",
          ine: "123456789M",
          first_tutor: 7,
          second_tutor: 8,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        },
        {
          firstname: "Sabrina",
          lastname: "Cuviller",
          gender: "F",
          birthdate: "1980-03-03",
          adress: "150 avenue des champs",
          city: "Bordeaux",
          zipcode: "33000",
          mail: "SabroLaser@lamanu.pinh",
          phone: "0789098754",
          ine: "123456789N",
          first_tutor: 9,
          second_tutor: 10,
          // id_establishment : 1,
          // id_class : 1,
          // id_role : 1,
          // id_status : 1
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users');
  },
};
