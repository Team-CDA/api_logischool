'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  reports.init({
    id_user: DataTypes.INTEGER.UNSIGNED,
    id_report_type: DataTypes.INTEGER.UNSIGNED,
    report_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'reports',
  });
  return reports;
};