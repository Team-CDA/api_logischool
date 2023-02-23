'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('homeworks_classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      id_class: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
          model:'classes',
          key:'id'
        }
      },
      id_homework: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references:{
          model:'homeworks',
          key:'id'
        }
      },
      plannified_date: {
        type: Sequelize.DATE,
        allowNull: false
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('homeworks_classes');
  }
};