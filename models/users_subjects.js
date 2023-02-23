'use strict';
const {
    Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, Sequelize) => {
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
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
        },
    id_subjects: { 
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
        },
    }, {
    sequelize,
    modelName: 'users_subjects',
    });
    return users_subjects;
};