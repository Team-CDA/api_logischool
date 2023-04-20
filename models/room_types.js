'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.rooms, {
        as : 'rooms',
        foreignKey: 'id_room_type'
      })
    }
  }
  room_types.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    room_type: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ ]+$"],
        max: 128,
        notNull: {
          msg: 'Room type is required'
        },
      }
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
    modelName: 'room_types',
  });
  return room_types;
};