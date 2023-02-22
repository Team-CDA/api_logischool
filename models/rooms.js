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
    name: DataTypes.STRING(128),
    id_room_type: DataTypes.INTEGER.UNSIGNED,
    id_building: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    },
    modelName: 'rooms',
  });
  return rooms;
};