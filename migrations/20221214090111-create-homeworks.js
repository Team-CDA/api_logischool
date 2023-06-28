"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "homeworks",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED,
        },
        course_image: {
          type: Sequelize.STRING(250),
        },
        homework_image: {
          type: Sequelize.STRING(250),
        },
        correction_image: {
          type: Sequelize.STRING(250),
        },
        name: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
        id_user: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: "users",
            key: "id",
          },
        },
        id_subject: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: "subjects",
            key: "id",
          },
        },
        id_class: {
          type: Sequelize.INTEGER.UNSIGNED,
          references: {
            model: "classes",
            key: "id",
          },
        },
        date_devoir: {
          allowNull: true,
          type: Sequelize.DATEONLY,
          defaultValue: null,
        },
        date_correction: {
          allowNull: true,
          type: Sequelize.DATEONLY,
          defaultValue: null,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        charset: "utf8",
        collate: "utf8_unicode_ci",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("homeworks");
  },
};
