'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buildings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      buildings.hasMany(models.rooms, {
        as: 'rooms',
        foreignKey: 'id_building'
      })
    }
  }
  buildings.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    }, 
    id_establishment: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    }
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    modelName: 'buildings',
  });
  return buildings;
};