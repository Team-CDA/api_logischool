'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class timeslots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  timeslots.init({
    slot_duration: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'timeslots',
  });
  return timeslots;
};