'use strict';

// Cette fonction vérifie si une date donnée est un jour férié ou pendant les vacances.
const isHolidayOrVacation = (date) => {
  // Liste des jours fériés en 2023-2024 pour la zone B (ajustez selon vos besoins)
  const holidays = [
    new Date('2023-12-25'),
    new Date('2024-01-01'),
    new Date('2024-04-01'),
    new Date('2024-05-01'),
    // Ajoutez d'autres jours fériés ici
  ];

  // Périodes de vacances pour la zone B (ajustez selon vos besoins)
  const vacations = [
    { start: new Date('2023-12-23'), end: new Date('2024-01-08') },
    { start: new Date('2024-02-11'), end: new Date('2024-02-27') },
    // Ajoutez d'autres périodes de vacances ici
  ];

  for (let holiday of holidays) {
    if (date.toDateString() === holiday.toDateString()) {
      return true;
    }
  }

  for (let vacation of vacations) {
    if (date >= vacation.start && date <= vacation.end) {
      return true;
    }
  }

  return false;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let seeders = [];

    let startDate = new Date('2023-10-16T09:00:00');
    let endDate = new Date('2024-07-01T00:00:00');

    const timeSlots = [60, 90];

    for (let currentDate = new Date(startDate); currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      // Skip weekends and holidays
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6 || isHolidayOrVacation(currentDate)) {
        continue;
      }

      let currentTime = new Date(currentDate);
      currentTime.setHours(9, 0, 0); // Les cours commencent à 9h

      while (currentTime.getHours() < 17) { // Les cours se terminent à 17h
        let randomTeacher = Math.floor(Math.random() * 10) + 1; // Ajustez selon le nombre d'enseignants
        let randomSubject = Math.floor(Math.random() * 5) + 1; // 5 matières
        let randomClass = Math.floor(Math.random() * 3) + 1; // 3 classes
        let randomRoom = Math.floor(Math.random() * 6) + 1; // 6 salles

        let randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];

        let seeder = {
          lesson_datetime: new Date(currentTime),
          id_timeslot: randomTimeSlot === 60 ? 1 : 2,
          id_user: randomTeacher,
          id_subject: randomSubject,
          id_class: randomClass,
          id_room: randomRoom
        };

        seeders.push(seeder);

        currentTime.setMinutes(currentTime.getMinutes() + randomTimeSlot);
      }
    }

    await queryInterface.bulkInsert('lessons', seeders, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lessons', null, {});
  }
};
