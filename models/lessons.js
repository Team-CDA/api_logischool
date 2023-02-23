'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  lessons.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    lesson_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    id_room: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_subject: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_timeslot: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    id_class: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
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
    modelName: 'lessons',
  });
  return lessons;
};