'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alert_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alert_types.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alert_types',
  });
  return alert_types;
};