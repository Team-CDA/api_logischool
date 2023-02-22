
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class report_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  report_types.init({
    report_name: DataTypes.STRING(128)
  }, {
    sequelize,
    modelName: 'report_types',
  });
  return report_types;
};