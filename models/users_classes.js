

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
      this.belongsTo(models.users, {
          foreignKey: "id_user",
          as: "users",
        });
        this.belongsTo(models.classes, {
          foreignKey: "id_class",
          as: "classes",
        });
    }
  }
  users_classes.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
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
    id_class: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: 'Class\'s id must be a number'
        },
        notNull: {
          msg: 'Class\'s id is required'
        },
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'users_classes',
  });
  
  return users_classes;
};
