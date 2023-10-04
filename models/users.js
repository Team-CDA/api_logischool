"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      this.belongsToMany(models.classes, {
        through: "users_classes",
        foreignKey: "id_user",
      });

      this.belongsToMany(models.lessons, {
        through: "missing_students",
        foreignKey: "id_lesson",
      });

      this.belongsToMany(models.subjects, {
        through: "users_subjects",
        foreignKey: "id_user",
      });

      this.belongsToMany(models.classes, {
        through: "professors_classes",
        foreignKey: "id_professor",
        as: "profClass",
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
      this.belongsTo(this, {
        as: "tutor",
        foreignKey: "first_tutor",
      });
      this.belongsTo(this, {
        as: "tutor2",
        foreignKey: "second_tutor",
      });
      this.belongsToMany(models.groups, {
        through: "users_groups",
        foreignKey: "id_user",
      });
    }
    static async comparePassword(plainPassword, hashedPassword) {
      return await bcrypt.compare(plainPassword, hashedPassword);
    }
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
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
      },
      lastname: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: function () {
          return this.id_role !== 2;
        },
        validate: {
          notEmpty: true,
          isDate: true,
        },
      },
      gender: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: function () {
          return this.id_role !== 2;
        },
        validate: {
          notEmpty: true,
          isAlpha: true,
        },
      },
      adress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z0-9À-ÿ-.,\s]+(?:\s[a-zA-Z0-9À-ÿ-.,\s]+)*$/,
        },
      },
      city: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-ZÀ-ÿ\-]+(?:\s[a-zA-ZÀ-ÿ\-]+)*$/,
        },
      },
      zipcode: {
        type: DataTypes.CHAR(5),
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
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
        allowNull: true,
        validate: {
          len: [8, 128], // Spécifiez une longueur minimale et maximale pour le mot de passe
        },
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      ine: {
        type: DataTypes.CHAR(11),
        allowNull: function () {
          return this.id_role !== 2;
        },
        validate: {
          notEmpty: true,
          isAlphanumeric: true,
        },
      },
      first_tutor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: function () {
          return this.id_role !== 2;
        },
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      second_tutor: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: function () {
          return this.id_role !== 2;
        },
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      id_establishment: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      id_role: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      id_status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        validate: {
          notEmpty: false,
          isNumeric: true,
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
    }
  );
  return users;
};
