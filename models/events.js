'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      events.belongsTo(models.event_types, {
        foreignKey: 'id_event_type',
        as: 'event_type',
      });
    }
  }
  events.init({
    message: DataTypes.TEXT('medium'),
    starting_date: DataTypes.DATE,
    ending_date: DataTypes.DATE,
    id_event_type: DataTypes.INTEGER.UNSIGNED,
  }, {
    sequelize,
    modelName: 'events',
  });
  return events;
};