'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class corrections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  corrections.init({
    correction_image: DataTypes.STRING,
    id_homework: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'corrections',
  });
  return corrections;
};