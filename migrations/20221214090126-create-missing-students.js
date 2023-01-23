'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('missing_students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_user: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
      },
      id_lesson: {
        type: Sequelize.INTEGER,
        references:{
          model:'lessons',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('missing_students');
  }
};