'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class missing_students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  missing_students.init({
    id: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'User\'s id must be a number'
        },
        notNull: {
          msg: 'User\'s id is required'
        },
      }
    },
    id_lesson: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Lesson\'s id must be a number'
        },
        notNull: {
          msg: 'Lesson\'s id is required'
        },
      }
    },
    justified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    modelName: 'missing_students',
  });
  return missing_students;
};
