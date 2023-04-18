'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class establishments extends Model {
    static associate(models) {
      establishments.belongsTo(models.establishment_types, {
        as: 'establishmentType',
        foreignKey: 'id'
      });
      establishments.hasMany(models.users, {
        as: 'users',
        foreignKey: 'id_establishment'
      });
      establishments.hasMany(models.buildings, {
        as: 'buildings',
        foreignKey: 'id_establishment'
      });
    }
  }
  establishments.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ]+$"],
        max: 128,
        notEmpty: true,
        notNull: {
          msg: 'Name is required'
        },
      },
    },
    id_establishment_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        notEmpty: true,
        isNumeric: true,
        allowNull: false,
      },
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
    modelName: 'establishments',
  });
  return establishments;
};