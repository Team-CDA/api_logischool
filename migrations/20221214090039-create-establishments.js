'use strict';
const { Sequelize, DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('establishments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      name: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true
      },
      id_establishment_type: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'establishment_types',
          key: 'id'
        }
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address is required",
          },
          notNull: {
            msg: "Address is required",
          },
        },
      },
      zip_code: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Zip code is required",
          },
          notNull: {
            msg: "Zip code is required",
          },
          isNumeric: {
            msg: "Zip code must be a number",
          },
          len: {
            args: [5, 5],
            msg: "Zip code must be 5 characters long",
          },
        },
      },
      city: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "City is required",
          },
          notNull: {
            msg: "City is required",
          },
        },
      },
      phone : {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone is required",
          },
          notNull: {
            msg: "Phone is required",
          },
          isNumeric: {
            msg: "Phone must be a number",
          },
          len: {
            args: [10, 10],
            msg: "Phone must be 10 characters long",
          },
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
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('establishments');
  }
};