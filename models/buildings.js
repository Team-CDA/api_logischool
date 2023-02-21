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
    name: DataTypes.STRING,
    id_establishment: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    modelName: 'buildings',
  });
  return buildings;
};