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
      // define association here
      this.hasMany(models.users, {
        foreignKey: 'id',
      })
      this.hasMany(models.classes, {
        foreignKey: 'id',
      })
    }
  }
  users_classes.init({
    id_user: DataTypes.INTEGER,
    id_class: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users_classes',
  });
  return users_classes;
};