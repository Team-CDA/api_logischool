"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const buildingNames = ['A', 'B', 'C', 'D', 'E', 'F'];
    const buildingData = buildingNames.map((name) => ({
      name: `Bâtiment ${name}`,
      id_establishment: 1, // Remplacer par l'ID d'établissement approprié
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("buildings", buildingData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('buildings', null, {});
  },
};
