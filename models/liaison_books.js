"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class liaison_books extends Model {
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "id_initiator",
        as: "initiator",
      });
      this.belongsTo(models.users, {
        foreignKey: "id_parent",
        as: "parent",
      });
      this.belongsTo(models.users, {
        foreignKey: "id_student",
        as: "student",
      });
    }
    static async comparePassword(plainPassword, hashedPassword) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    }
  }
  liaison_books.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      date_message: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      date_response: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
      message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      message_object: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      response: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      id_initiator: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_parent: {
        allowNull: true,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
      },
      id_student: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "liaison_books",
    }
  );
  return liaison_books;
};
