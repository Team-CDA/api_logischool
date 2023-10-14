'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class establishments extends Model {
    static associate(models) {
      establishments.belongsTo(models.establishment_types, {
        as: 'establishmentType',
        foreignKey: 'id_establishment_type'
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
        is: ["^[a-zA-Z0-9À-ÿ ]+$"],
        max: 128,
        notEmpty: true,
        notNull: {
          msg: 'Name is required'
        },
      },
    },
    id_establishment_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Establishment type is required",
        },
        isNumeric: {
          msg: "Establishment type must be a number",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Address is required",
        },
        notNull: {
          msg: "Address is required",
        },
      },
    },
    zip_code: {
      type: DataTypes.STRING(5),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Zip code is required",
        },
        notNull: {
          msg: "Zip code is required",
        },
        isNumeric: {
          msg: "Zip code must be a number",
        },
        len: {
          args: [5, 5],
          msg: "Zip code must be 5 characters long",
        },
      },
    },
    city: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "City is required",
        },
        notNull: {
          msg: "City is required",
        },
      },
    },
    phone : {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone is required",
        },
        notNull: {
          msg: "Phone is required",
        },
        isNumeric: {
          msg: "Phone must be a number",
        },
        len: {
          args: [10, 10],
          msg: "Phone must be 10 characters long",
        },
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