'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users_classes', [
          {
            id_user: 1,
            id_class: 1
          },
          {
            id_user: 2,
            id_class: 1
          },
          {
            id_user: 3,
            id_class: 1
          },
          {
            id_user: 4,
            id_class: 1
          },
          {
            id_user: 5,
            id_class: 1
          },
          {
            id_user: 6,
            id_class: 1
          },
          {
            id_user: 7,
            id_class: 1
          },
          {
            id_user: 8,
            id_class: 1
          },
          {
            id_user: 9,
            id_class: 1
          },
          {
            id_user: 10,
            id_class: 1
          },
          {
            id_user: 11,
            id_class: 2
          },
          {
            id_user: 12,
            id_class: 2
          },
          {
            id_user: 13,
            id_class: 2
          },
          {
            id_user: 14,
            id_class: 2
          },
          {
            id_user: 15,
            id_class: 2
          },
          {
            id_user: 16,
            id_class: 2
          },
          {
            id_user: 17,
            id_class: 2
          },
          {
            id_user: 18,
            id_class: 2
          },
          {
            id_user: 19,
            id_class: 2
          },
          {
            id_user: 20,
            id_class: 2
          },
          {
            id_user: 21,
            id_class: 3
          },
          {
            id_user: 22,
            id_class: 3
          },
          {
            id_user: 23,
            id_class: 3
          },
          {
            id_user: 24,
            id_class: 3
          },
          {
            id_user: 25,
            id_class: 3
          },
        ], {}
        );
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users_groups');
  }  
  
};
