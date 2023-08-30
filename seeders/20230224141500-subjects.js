"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
        "subjects",
        [
        {
            subject_name: "Français",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            subject_name: "Mathématique",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            subject_name: "Histoire",
            createdAt: new Date(),
            updatedAt: new Date()        
        },
        {
            subject_name: "Géographie",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Sport",
            createdAt: new Date(),
            updatedAt: new Date()        
        },
        {
            subject_name: "Biologie",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Anglais",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "EPS",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Arts plastiques",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Musique",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Physique",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        {
            subject_name: "Chimie",
            createdAt: new Date(),
            updatedAt: new Date()  
        },
        ],
        {}
    );
    },

    async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query('TRUNCATE TABLE users');
    },
};
