
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        "users_subjects",
        [
        {
            id_user: 26,
            id_subject: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id_user: 2,
            id_subject: 2,
            createdAt: new Date(),
            updatedAt: new Date()      
        },
        {
            id_user: 3,
            id_subject: 3,
            createdAt: new Date(),
            updatedAt: new Date()      
        },
        {
            id_user: 4,
            id_subject: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id_user: 5,
            id_subject: 5,
            createdAt: new Date(),
            updatedAt: new Date() 
        },
        ],
        {}
    );
    },

    async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('TRUNCATE TABLE users_subjects');
    },
};
