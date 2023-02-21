'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATE
      },
      adress: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      ine: {
        type: Sequelize.STRING
      },
      first_tutor: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      second_tutor: {
        type: Sequelize.INTEGER.UNSIGNED
      },
      id_establishment: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'establishments',
          key:'id'
        }
      },
      id_class: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'classes',
          key:'id'
        }
      },
      id_gender: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'genders',
          key:'id'
        }
      },
      id_role: {
        type: Sequelize.INTEGER.UNSIGNED.UNSIGNED,
        references:{
          model:'roles',
          key:'id'
        }
      },
      id_status: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'statuses',
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
    await queryInterface.dropTable('users');
  }
};