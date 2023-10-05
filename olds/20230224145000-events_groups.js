"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        "events_groups",
        [
        {
            id_event: 1,
            id_group: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id_event: 2,
            id_group: 2,
            createdAt: new Date(),
            updatedAt: new Date()    
        },
        {
            id_event: 3,
            id_group: 3,
            createdAt: new Date(),
            updatedAt: new Date()    
        },
        ],
        {}
    );
    },

    async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE events_groups');
    },
};
