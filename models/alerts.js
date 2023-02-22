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
      this.belongsTo(models.alert_types, { foreignKey: 'id_alert_type', as : 'alert_types' });
      this.hasMany(models.alerts_groups, {
        as: 'alerts_groups',
        foreignKey: 'id_group'
      })
    }
    
  }
  alerts.init({
    message: DataTypes.TEXT('medium'),
    id_alert_type: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'alerts',
  });
  return alerts;
};