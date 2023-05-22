'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class class_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.classes, {
        as: "classes",
        foreignKey: "id_class_type",
      });
      this.belongsTo(models.establishment_types, {
        as: 'establishment_type',
        foreignKey: 'id_establishment_type',
      });
    
    }
  }
  class_types.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    class_type: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ ]+$"],
        max: 64,
        notEmpty: true,
      }
    },
    id_establishment_type: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'establishment_types', // Nom du modèle lié
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'class_types',
  });
  return class_types;
};