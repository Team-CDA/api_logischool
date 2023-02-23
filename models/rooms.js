'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rooms.belongsTo(models.buildings, {
        as : 'buildings',
        foreignKey: 'id_building'
      }),
      rooms.belongsTo(models.room_types, {
        as : 'room_types',
        foreignKey: 'id_room_type'
      })
    }
  }
  rooms.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ]+$"],
        max: 128,
        notEmpty: true,
      }
    },
    id_room_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_building: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    modelName: 'rooms',
  });
  return rooms;
};