'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
    }
  }
  roles.init({
    role: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [0, 32],
        notEmpty: true,
        isAlpha: true
      }

    }
  }, {
    sequelize,
    modelName: 'roles',
  });
  return roles;
};