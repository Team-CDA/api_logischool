"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class signatures extends Model {
        static associate(models) {
        this.belongsTo(models.users, {
            foreignKey: "student_id",
            as: "eleves",
        });
        }
    }
    signatures.init(
        {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        student_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
            model: "users",
            key: "id",
            },
            onUpdate: "CASCADE", // cela permet de mettre à jour automatiquement les userId dans la table posts si l'id de l'utilisateur est modifié dans la table users
            onDelete: "CASCADE", 
        },
        datetime_emargement: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        signature: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        modelName: "signatures",
        }
    );
    return signatures;
};
