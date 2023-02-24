'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.users, {
        foreignKey: 'id_status',
        // as: 'status'
      });
    }
  }
  status.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Status is required'
        },
        notEmpty: {
          msg: 'Status is required'
        },
        is: {
          args: ["^[a-zA-Z0-9À-ÿ]+$"],
          msg: 'Status must be alphanumeric'
        },
        max: {
          args: 64,
          msg: 'Status must be less than 64 characters'
        }
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
    modelName: 'statuses',
    freezeTableName: true
  });
  return status;
};