'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_subjects', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER.UNSIGNED,
        },
        id_user: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        references:{
            model:'users',
            key:'id'
        }
        },
        id_subject: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
            references:{
                model:'subjects',
                key:'id'
            }
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: new Date()
        }
    },
    {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    },
    async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_subjects');
    }
};