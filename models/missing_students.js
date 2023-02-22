'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class missing_students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  missing_students.init({
    id_user: DataTypes.INTEGER.UNSIGNED,
    id_lesson: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'missing_students',
  });
  return missing_students;
};