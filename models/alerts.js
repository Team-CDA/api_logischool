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
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.TEXT('medium'),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Message is required'
        },
      }
    },
    transmission_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Transmission date is required'
        },
      }
    },
    id_alert_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Alert type is required'
        },
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'alerts',
  });
  return alerts;
};