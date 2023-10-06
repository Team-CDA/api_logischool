'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let seeders = [];

    let startDate = new Date('2023-10-16T09:00:00');
    let endDate = new Date('2024-07-01T00:00:00');

    const timeSlots = [60, 90];

    for (let currentDate = new Date(startDate); currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      // Skip weekends
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        continue;
      }

      let currentTime = new Date(currentDate);
      while (currentTime.getHours() < 17) {
        for (let timeSlot of timeSlots) {
          let randomUser = Math.floor(Math.random() * 10) + 1;
          let randomSubject = Math.floor(Math.random() * 5) + 1;
          let randomClass = Math.floor(Math.random() * 3) + 1;
          let randomRoom = Math.floor(Math.random() * 4) + 1;

          let seeder = {
            lesson_datetime: new Date(currentTime),
            id_timeslot: timeSlot === 60 ? 1 : 2,
            id_user: randomUser,
            id_subject: randomSubject,
            id_class: randomClass,
            id_room: randomRoom
          };
          seeders.push(seeder);

          currentTime.setMinutes(currentTime.getMinutes() + timeSlot);
        }
      }
    }

    await queryInterface.bulkInsert('lessons', seeders, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
