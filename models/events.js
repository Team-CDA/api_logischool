'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  events.init({
    message: DataTypes.STRING,
    starting_date: DataTypes.DATE,
    ending_date: DataTypes.DATE,
    id_event_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};