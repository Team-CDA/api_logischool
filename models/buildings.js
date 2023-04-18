"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class buildings extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.rooms, { 
        foreignKey: "id_building" 
      });
      this.hasMany(models.rooms, {
        as: "building's rooms",
        foreignKey: "id_building",
      });
      this.belongsTo(models.establishments, {
        foreignKey: "id_establishment",
        as: "establishment",
      });
    }
  }
  buildings.init(
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
          is: ["^[a-zA-Z0-9À-ÿ]+$"],
          max: 128,
          notNull: {
            msg: "Name is required",
          },
        },
      },
      id_establishment: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Establishment's id is required",
          },
        },
      },
    },
    {
      sequelize,
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      modelName: "buildings",
    }
  );
  return buildings;
};
