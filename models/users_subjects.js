'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class users_subjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    }
    users_subjects.init({
    id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
        },
    id_subject: { 
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
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
    modelName: 'users_subjects',
    });
    return users_subjects;
};