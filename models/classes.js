'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      classes.belongsTo(models.class_types, {
        foreignKey: 'id_class_type',
        as: 'class_type',
      });
    }
  }
  classes.init({
    name: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ]+$"],
        max: 64,
        notEmpty: true,
      }
    },
    scolarity_year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};