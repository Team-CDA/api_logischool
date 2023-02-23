'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_subjects', {
        id: {
            allowNull: false,
            type: Sequelize.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER.UNSIGNED
        },
        id_user: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        references:{
            model:'classes',
            key:'id'
        }
        },
        id_subjects: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references:{
                model:'subjects',
                key:'id'
            }
        },
    });
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_subjects');
    }
};