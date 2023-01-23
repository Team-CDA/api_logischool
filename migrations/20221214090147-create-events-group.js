'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events_groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_event: {
        type: Sequelize.INTEGER,
        references:{
          model:'events',
          key:'id'
        }
      },
      id_group: {
        type: Sequelize.INTEGER,
        references:{
          model:'groups',
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
    await queryInterface.dropTable('events_groups');
  }
};