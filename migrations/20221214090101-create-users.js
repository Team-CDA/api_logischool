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
        type: Sequelize.STRING(64),
        allowNull: false
      },
      lastname: {
        type: Sequelize.STRING(64)
      },
      gender: {
        type: Sequelize.ENUM('M', 'F')
      },
      birthdate: {
        type: Sequelize.DATE
      },
      adress: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING(128)
      },
      zipcode: {
        type: Sequelize.CHAR(5)
      },
      mail: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.CHAR(10)
      },
      ine: {
        type: Sequelize.CHAR(11)
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
      id_role: {
        type: Sequelize.INTEGER.UNSIGNED,
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