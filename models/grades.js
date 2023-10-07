"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Grades extends Model {
    static associate(models) {
      this.belongsTo(models.users, {
        foreignKey: "id_student",
        as: "student",
      });

      this.belongsTo(models.users, {
        foreignKey: "id_teacher",
        as: "teacher",
      });

      this.belongsTo(models.subjects, {
        foreignKey: "id_subject",
        as: "subject",
      });
      this.belongsTo(models.users_classes, {
        foreignKey: "id_student",
        as: "studentClass",
      });
    }
  }

  Grades.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    id_student: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_teacher: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_subject: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "subjects",
        key: "id",
      },
    },
    grade: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
  }, {
    sequelize,
    modelName: "grades",
  });

  return Grades;
};
