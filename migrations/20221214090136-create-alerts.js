'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      transmission_date: {
        type: Sequelize.DATE
      },
      id_alert_type: {
        type: Sequelize.INTEGER,
        references:{
          model:'alert_types',
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
    await queryInterface.dropTable('alerts');
  }
};