'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const gradesData = [];

    const generateRandomGrade = () => {
      // retourne un nombre aléatoire entre 0 et 20
      return Math.floor(Math.random() * 21);

    };

    const generateRandomDates = (count) => {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1);
      const endOfYear = new Date(new Date().getFullYear(), 11, 31);
      const dates = [];
      // Génère un nombre aléatoire de dates entre le 1er janvier et le 31 décembre de l'année en cours
      for (let i = 0; i < count; i++) {
        const randomDate = new Date(startOfYear.getTime() + Math.random() * (endOfYear.getTime() - startOfYear.getTime()));
        dates.push(randomDate);
      }
      return dates;
    };

    // Génère 8 dates aléatoires
    const uniqueDates = generateRandomDates(8);
    
    for (let studentId = 1; studentId <= 9; studentId++) {
      for (let i = 0; i < uniqueDates.length; i++) {
        gradesData.push({
          id_student: studentId,
          id_teacher: 26,
          id_subject: 1,
          grade: generateRandomGrade(),
          createdAt: uniqueDates[i],
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert('grades', gradesData, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('grades', null, {});
  },
};
