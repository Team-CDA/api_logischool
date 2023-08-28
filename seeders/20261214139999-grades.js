'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('grades', [
      {
        id_student: 1,
        id_teacher: 1,
        id_subject: 1,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 2,
        id_subject: 2,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 3,
        id_subject: 3,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 4,
        id_subject: 4,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 5,
        id_subject: 5,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 6,
        id_subject: 6,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 2,
        id_subject: 7,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 2,
        id_subject: 8,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 3,
        id_subject: 9,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 4,
        id_subject: 10,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 5,
        id_subject: 11,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 4,
        id_subject: 12,
        grade: 8.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('grades', null, {});
  },
};

