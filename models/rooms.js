"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    static associate(models) {
      this.belongsTo(models.buildings, { 
        foreignKey: 'id_building' 
      });
      this.belongsTo(models.room_types, {
        as: "room_types",
        foreignKey: "id_room_type",
      });
      this.hasMany(models.lessons, {
        as: "lessons",
        foreignKey: "id_room",
      });
    }
  }

  rooms.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          is: ["^[a-zA-Z0-9À-ÿ ]+$"],
          max: 128,
          notEmpty: true,
        },
      },
      id_room_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Room_type must be a number",
          },
          notNull: {
            msg: "Room type is required",
          },
        },
      },
      id_building: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Building must be a number",
          },
          notNull: {
            msg: "Building is required",
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
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      modelName: "rooms",
    }
  );
  return rooms;
};
