'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let seeders = [];

    let startDate = new Date('2023-10-02T09:00:00'); 
    let endDate = new Date('2023-11-02T00:00:00');

    const timeSlots = [60, 90];

    for (let currentDate = new Date(startDate); currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        continue;
      }

      for (let classId = 1; classId <= 3; classId++) { // Trois classes
        let currentTime = new Date(currentDate);
        while (currentTime.getHours() < 17) {
          for (let timeSlot of timeSlots) {
            let randomUser = Math.floor(Math.random() * 10) + 1;
            let randomSubject = Math.floor(Math.random() * 5) + 1;
            let randomRoom = Math.floor(Math.random() * 4) + 1;

            let seeder = {
              lesson_datetime: new Date(currentTime),
              id_timeslot: timeSlot === 60 ? 1 : 2,
              id_user: randomUser,
              id_subject: randomSubject,
              id_class: classId,  // Utilisation de classId au lieu d'un nombre aléatoire
              id_room: randomRoom
            };
            seeders.push(seeder);

            currentTime.setMinutes(currentTime.getMinutes() + timeSlot);
          }
        }
      }
    }

    await queryInterface.bulkInsert('lessons', seeders, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
