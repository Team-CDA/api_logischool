
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
      report_types.hasMany(models.reports, {
        as: 'reports',
        foreignKey: 'id_report_type'
      });
    }
  }
  report_types.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    report_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ ]+$"],
        max: 128,
        notNull: {
          msg: 'Report name is required'
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
    modelName: 'report_types',
  });
  return report_types;
};