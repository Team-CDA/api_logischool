'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ratings', [
      {
        id_student: 1,
        id_teacher: 1,
        id_subject: 1,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-12-31'),
        appreciation: 'Bon travail',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 2,
        id_subject: 2,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-30'),
        appreciation: 'Excellent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_student: 1,
        id_teacher: 3,
        id_subject: 3,
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-06-30'),
        appreciation: 'Bon travail',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ratings', null, {});
  },
};
