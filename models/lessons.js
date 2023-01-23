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
    id_room: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    id_subject: DataTypes.INTEGER,
    id_timeslot: DataTypes.INTEGER,
    id_class: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'lessons',
  });
  return lessons;
};