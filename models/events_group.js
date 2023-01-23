'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  events_group.init({
    id_event: DataTypes.INTEGER,
    id_group: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'events_group',
  });
  return events_group;
};