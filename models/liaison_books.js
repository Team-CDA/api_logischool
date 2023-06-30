"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class liaison_books extends Model {
        static associate(models) {
            this.hasMany(models.users, {
                foreignKey: "id",
                as: "users",
            });
    }
        static async comparePassword(plainPassword, hashedPassword) {
        return await bcrypt.compare(plainPassword, hashedPassword);
        }
    }
    liaison_books.init(
        {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        date_message: {
            allowNull: false,
            type: DataTypes.DATE
        },
        date_response: {
            allowNull: false,
            type: DataTypes.DATE
        },
        message: {
            allowNull: false,
            type: DataTypes.STRING
        },
        message_object: {
            allowNull: false,
            type: DataTypes.STRING
        },
        response: {
            allowNull: false,
            type: DataTypes.STRING
        },
        id_initiator: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "users",
                key: "id",
            },
        },
        id_parent: {
            allowNull: true,
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "users",
                key: "id",
            },
        },
        id_student: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "users",
                key: "id",
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
        {
        sequelize,
        modelName: "liaison_books",
        },
    );
    return liaison_books;
};
