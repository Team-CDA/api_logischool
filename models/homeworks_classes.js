'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homeworks_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      homeworks_classes.belongsTo(models.homeworks, {
        as : 'homeworks',
        foreignKey: 'id_homework'
      }),
      homeworks_classes.belongsTo(models.classes, {
        as : 'classes',
        foreignKey: 'id_class'
      })
    }
  }
  homeworks_classes.init({
    id_class: DataTypes.INTEGER,
    id_homework: DataTypes.INTEGER,
    plannified_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'homeworks_classes',
  });
  return homeworks_classes;
};