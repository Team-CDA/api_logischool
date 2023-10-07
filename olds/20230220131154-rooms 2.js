'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rooms', [
      {
        name: 'Salle 1',
        id_room_type: 1,
        id_building: 1
    },
    {
      name: 'Salle 2',
      id_room_type: 2,
      id_building: 2
  },
  {
    name: 'Salle 3',
    id_room_type: 3,
    id_building: 3
},
    ], {}
    );
  },
  


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
