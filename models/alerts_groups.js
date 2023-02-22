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
      this.belongsTo(models.alerts, {
        as: 'alerts',
        foreignKey: 'id'
      }),
      this.belongsTo(models.groups, {
        as: 'groups',
        foreignKey: 'id'
      })
    }
  }
  alerts_groups.init({
    id_alert: DataTypes.INTEGER.UNSIGNED,
    id_group: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'alerts_groups',
  });
  return alerts_groups;
};