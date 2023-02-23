'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.classes, { through: 'users_classes', foreignKey: 'id_class'
      })
    }
  }
  users.init({
    firstname: {
      type: DataTypes.STRING(64),
      validate:{
        notEmpty: true,
      }
    },
    lastname: DataTypes.STRING(64),
    birthdate: DataTypes.DATE,
    gender: DataTypes.ENUM('M', 'F'),
    adress: DataTypes.STRING,
    city: DataTypes.STRING(128),
    zipcode: DataTypes.CHAR(5),
    mail: DataTypes.STRING,
    phone: DataTypes.CHAR(10),
    ine: DataTypes.CHAR(11),
    first_tutor: DataTypes.INTEGER.UNSIGNED,
    second_tutor: DataTypes.INTEGER.UNSIGNED,
    id_establishment: DataTypes.INTEGER.UNSIGNED,
    id_role: DataTypes.INTEGER.UNSIGNED,
    id_status: DataTypes.INTEGER.UNSIGNED
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};