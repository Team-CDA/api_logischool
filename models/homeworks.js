'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homeworks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  homeworks.init({
    plannified_date: DataTypes.DATE,
    homework_image: DataTypes.STRING,
    id_user: DataTypes.INTEGER,
    id_subjects: DataTypes.INTEGER,
    id_class: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'homeworks',
  });
  return homeworks;
};