'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.lessons, {
        foreignKey: "id_subject",
        as: "lessons",
      });

      this.belongsToMany(models.users, {
        through: "users_subjects",
        foreignKey: "id_subject",
    });
  }
};
  subjects.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    subject_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        is: ["^[a-zA-Z0-9À-ÿ]+$"],
        max: 128,
        notEmpty: true,
      }
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
    modelName: 'subjects',
  });
  return subjects;
};