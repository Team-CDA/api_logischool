"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.users, {
        foreignKey: "id",
        as: "users",
      });
      this.hasOne(models.classes, {
        foreignKey: "id",
        as: "classes",
      });
      this.hasOne(models.subjects, {
        foreignKey: "id",
        as: "subjects",
      });
      this.hasOne(models.rooms, {
        foreignKey: "id",
        as: "rooms",
        });
    }
  }
  lessons.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      lesson_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            msg: "Lesson's date must be a date",
          },
        },
      },
      id_room: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Room's id must be a number",
          },
          notNull: {
            msg: "Room's id is required",
          },
        },
      },
      id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "User's id must be a number",
          },
          notNull: {
            msg: "User's id is required",
          },
        },
      },
      id_subject: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Subject's id must be a number",
          },
          notNull: {
            msg: "Subject's id is required",
          },
        },
      },
      id_timeslot: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Timeslot's id must be a number",
          },
          notNull: {
            msg: "Timeslot's id is required",
          },
        },
      },
      id_class: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Class's id must be a number",
          },
          notNull: {
            msg: "Class's id is required",
          },
        },
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
      modelName: "lessons",
    }
  );
  return lessons;
};
