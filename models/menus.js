'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  menus.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    starter: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Starter is required'
        },
      }
    },
    main_course: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Main course is required'
        },
      }
    },
    dessert: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Dessert is required'
        },
      }
    },
    menu_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Report\'s date must be a date'
        },
        notNull: {
          msg: 'Report\'s date is required'
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
    modelName: 'menus',
  });
  return menus;
};