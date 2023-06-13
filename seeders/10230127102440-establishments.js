'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('establishments', [
      {
        id: 1,
      name: 'CM2',
      id_establishment_type :3,
      },
      {
        id: 2,
        name: 'CM3',
        id_establishment_type :3,
      },
      {
        id: 3,
      name: 'CM4',
      id_establishment_type :3,
      
      },
      {
        id: 4,
      name: 'CM5',
      id_establishment_type :3,
      },
      {
        id: 5,
        name: 'CM6',
        id_establishment_type :3,
      },
      {
        id: 6,
        name: 'CM7',
        id_establishment_type :3,
      }
    ], {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('establishments', null, {});
  }
};
