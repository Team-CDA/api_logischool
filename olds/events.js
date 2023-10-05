"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.event_types, {
        foreignKey: "id_event_type",
        as: "event_types",
      });
      this.belongsToMany(models.groups, {
        through: "events_groups",
        foreignKey: "id_event",
      });
    }
  }
  events.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      message: {
        type: DataTypes.TEXT("medium"),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Message is required",
          },
        },
      },
      starting_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Starting date is required",
          },
        },
      },
      ending_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ending date is required",
          },
        },
      },
      id_event_type: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Event type is required",
          },
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "events",
    }
  );
  return events;
};
