"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.users, {
        through: "users_classes",
        foreignKey: "id_class",
      });
      this.belongsToMany(models.users, {
        through: "professors_classes",
        foreignKey: "id_class",
        as: "Professors",
      });
      classes.hasMany(models.homeworks_classes, {
        as: "homeworks_classes",
        foreignKey: "id_class",
      });
      classes.hasMany(models.homeworks, {
        as: "homeworks",
        foreignKey: "id_class",
      });
      classes.hasMany(models.lessons, {
        as: "lessons",
        foreignKey: "id_class",
      });
      classes.belongsTo(models.class_types, {
        as: "class_type",
        foreignKey: "id_class_type",
      });
    }
  }
  classes.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      id_class_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Class type's id is required",
          },
        },
      },
      name: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false,
        validate: {
          is: ["^[a-zA-Z0-9À-ÿ ]+$"],
          max: 64,
          notEmpty: true,
          notNull: {
            msg: "Name is required",
          },
        },
      },
      scolarity_year: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Scolarity year is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "classes",
    }
  );
  return classes;
};
