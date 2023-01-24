'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alerts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alerts.init({
    message: DataTypes.STRING,
    transmission_date: DataTypes.DATE,
    id_alert_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'alerts',
  });
  return alerts;
};