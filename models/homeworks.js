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
      homeworks.hasMany(models.homeworks_classes, {
        as: 'homeworks_classes',
        foreignKey: 'id_homework'
      })
    }
  }
  homeworks.init({
    homework_image: DataTypes.STRING(64),
    correction_image: DataTypes.STRING(64),
    name: DataTypes.STRING(128),
    id_user: DataTypes.INTEGER.UNSIGNED,
    id_subjects: DataTypes.INTEGER.UNSIGNED,
    id_class: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'homeworks',
  });
  return homeworks;
};