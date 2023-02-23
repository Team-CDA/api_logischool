'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      groups.hasMany(models.alerts_groups, {
        as: 'alerts_groups',
        foreignKey: 'id_group'
      })
    }
  }
  groups.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    group_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ]+$"],
        max: 128,
        notNull: {
          msg: 'Group name is required'
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
    modelName: 'groups',
  });
  return groups;
};