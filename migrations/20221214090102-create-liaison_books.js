'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('liaison_books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      date_message: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      date_response: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      message_object: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      response: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      id_initiator: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_parent: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_student: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
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
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('liaison_books');
  }
};
