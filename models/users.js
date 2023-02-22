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
      type: DataTypes.STRING,
      validate:{
        notEmpty: true,
      }
    },
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    gender: DataTypes.INTEGER,
    adress: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    mail: DataTypes.STRING,
    phone: DataTypes.STRING,
    ine: DataTypes.STRING,
    first_tutor: DataTypes.INTEGER,
    second_tutor: DataTypes.INTEGER,
    id_establishment: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};