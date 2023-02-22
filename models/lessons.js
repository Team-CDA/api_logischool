'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lessons.init({
    lesson_datetime: DataTypes.DATE,
    id_room: DataTypes.INTEGER.UNSIGNED,
    id_user: DataTypes.INTEGER.UNSIGNED,
    id_subject: DataTypes.INTEGER.UNSIGNED,
    id_timeslot: DataTypes.INTEGER.UNSIGNED,
    id_class: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'lessons',
  });
  return lessons;
};