'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class homeworks_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      homeworks_classes.belongsTo(models.homeworks, {
        as : 'homeworks',
        foreignKey: 'id_homework'
      }),
      homeworks_classes.belongsTo(models.classes, {
        as : 'classes',
        foreignKey: 'id_class'
      })
    }
  }
  homeworks_classes.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    id_class: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Class\'s id must be a number'
        },
        notNull: {
          msg: 'Class\'s id is required'
        },
      }
    },
    id_homework: { 
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Homework\'s id must be a number'
        },
        notNull: {
          msg: 'Homework\'s id is required'
        },
      }
    },
    plannified_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Plannified date must be a date'
        },
          notNull: {
          msg: 'Plannified date is required'
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
    modelName: 'homeworks_classes',
  });
  return homeworks_classes;
};