'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alerts_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  alerts_groups.init({
    id_alert: DataTypes.INTEGER,
    id_group: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'alerts_groups',
  });
  return alerts_groups;
};