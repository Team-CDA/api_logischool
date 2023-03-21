"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt"); // Importez bcrypt
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.belongsToMany(models.classes, {
        through: "users_classes",
        foreignKey: "id_class",
      });
      
      this.belongsToMany(models.lessons, {
        through: "missing_students",
        foreignKey: "id_lesson",
      });

      this.belongsToMany(models.subjects, {
        through: "users_subjects",
        foreignKey: "id_user",
      });

      this.belongsTo(models.roles, {
        foreignKey: "id_role",
        as: "roles",
      });

      this.belongsTo(models.establishments, {
        foreignKey: "id_establishment",
        as: "establishments",
      });
      this.hasMany(models.lessons, {
        foreignKey: "id_user",
        as: "user_lessons",
      });
      this.belongsTo(models.statuses, {
        foreignKey: "id_status",
        as: "status",
      });
    };
    static async comparePassword(plainPassword, hashedPassword) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    };
  }
  users.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      firstname: {
        type: DataTypes.STRING(64),
        validate: {
          notEmpty: true,
          isAlpha: true,
          allowNull: false,
        },
      },
      lastname: {
        type: DataTypes.STRING(64),
        validate: {
          notEmpty: true,
          isAlpha: true,
          allowNull: false,
        },
      },
      birthdate: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: true,
          isDate: true,
          allowNull: false,
        },
      },
      gender: {
        type: DataTypes.ENUM("M", "F"),
        validate: {
          notEmpty: true,
          isAlpha: true,
          allowNull: false,
        },
      },
      adress: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          allowNull: false,
        },
      },
      city: {
        type: DataTypes.STRING(128),
        validate: {
          notEmpty: true,
          isAlpha: true,
          allowNull: false,
        },
      },
      zipcode: {
        type: DataTypes.CHAR(5),
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [8, 128], // Spécifiez une longueur minimale et maximale pour le mot de passe
        },
      },
      phone: {
        type: DataTypes.CHAR(10),
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      ine: {
        type: DataTypes.CHAR(11),
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
          allowNull: false,
        },
      },
      first_tutor: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      second_tutor: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      id_establishment: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      id_role: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notEmpty: true,
          isNumeric: true,
          allowNull: false,
        },
      },
      id_status: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          notEmpty: true,
          isNumeric: true,
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
    },
    {
      hooks: {
        // Ajout d'un hook beforeCreate pour crypter le mot de passe avant de l'enregistrer
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
      sequelize,
      modelName: "users",
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
