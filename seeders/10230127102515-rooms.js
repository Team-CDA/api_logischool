"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const buildingNames = ['A', 'B', 'C', 'D', 'E', 'F'];
    const roomNumbers = ['01', '02', '03'];
    const roomData = [];

    // Génération des données de salle pour chaque bâtiment
    let buildingId = 1;
    for (const buildingName of buildingNames) {
      for (const roomNumber of roomNumbers) {
        roomData.push({
          name: `${buildingName}${roomNumber}`,
          id_room_type: Math.floor(Math.random() * 10) + 1, // Générer un ID de type de salle entre 1 et 10
          id_building: buildingId, // ID du bâtiment, à ajuster en fonction de votre base de données
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      buildingId++; // Incrémenter l'ID du bâtiment pour le prochain tour de boucle
    }

    await queryInterface.bulkInsert("rooms", roomData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rooms', null, {});
  },
};
