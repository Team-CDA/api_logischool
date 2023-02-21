'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lessons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      lesson_datetime: {
        type: Sequelize.DATE
      },
      id_room: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'rooms',
          key:'id'
        }
      },
      id_user: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'users',
          key:'id'
        }
      },
      id_subject: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'subjects',
          key:'id'
        }
      },
      id_timeslot: {
        type: Sequelize.INTEGER.UNSIGNED,
        references:{
          model:'timeslots',
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
    await queryInterface.dropTable('lessons');
  }
};