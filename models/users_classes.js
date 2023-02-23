

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  users_classes.init({
    id_user: DataTypes.INTEGER.UNSIGNED,
    id_class: DataTypes.INTEGER.UNSIGNED,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users_classes',
  });
  
  return users_classes;
};
