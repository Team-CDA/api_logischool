'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Création d'un tableau d'objets à insérer pour id_user de 1 à 20 avec id_group 4
    const bulkData = [];
    for (let i = 1; i <= 20; i++) {
      bulkData.push({
        id_group: 4,
        id_user: i
      });
    }

    // Ajout des id_user de 21 à 24 avec id_group 5
    for (let i = 21; i <= 24; i++) {
      bulkData.push({
        id_group: 5,
        id_user: i
      });
    }

    // Ajoute de l'id_user 25 avec id_group 1
    bulkData.push({
      id_group: 1,
      id_user: 25
    });

    // Ajoute des id_user 26 et 34 avec id_group 2
    bulkData.push({
      id_group: 2,
      id_user: 26
    });

    // Ajoute des id_user 26 et 34 avec id_group 4
    bulkData.push({
      id_group: 2,
      id_user: 26
    });

    // Insertion en bloc
    await queryInterface.bulkInsert('users_groups', bulkData, {});
  },

  async down (queryInterface, Sequelize) {
    // Code pour annuler les changements, si nécessaire
    // await queryInterface.sequelize.query('TRUNCATE TABLE users_groups');
  }  
};
