'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users_groups.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    id_group: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Group\'s id must be a number'
        },
        notNull: {
          msg: 'Group\'s id is required'
        },
      }
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'User\'s id must be a number'
        },
        notNull: {
          msg: 'User\'s id is required'
        },
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'users_groups',
  });
  return users_groups;
};