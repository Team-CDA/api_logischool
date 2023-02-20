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
      users.belongsTo(models.lessons, {
        as : 'lessons', 
        foreignKey : 'id'
      })
    }
  }
  users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    adress: DataTypes.STRING,
    city: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    mail: DataTypes.STRING,
    phone: DataTypes.STRING,
    ine: DataTypes.STRING,
    first_tutor: DataTypes.INTEGER,
    second_tutor: DataTypes.INTEGER,
    id_establishment: DataTypes.INTEGER,
    id_class: DataTypes.INTEGER,
    id_gender: DataTypes.INTEGER,
    id_role: DataTypes.INTEGER,
    id_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};