"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class homeworks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, {
        foreignKey: "id_user",
        as: "user",
      });
      this.belongsTo(models.classes, {
        foreignKey: "id_class",
        as: "class",
      });
    }
  }
  homeworks.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      homework_image: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      course_image: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      correction_image: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_subject: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_class: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      date_devoir: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      date_correction: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "homeworks",
    }
  );
  return homeworks;
};
