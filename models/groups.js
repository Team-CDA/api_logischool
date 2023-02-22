'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      groups.hasMany(models.alerts_groups, {
        as: 'alerts_groups',
        foreignKey: 'id_group'
      })
    }
  }
  groups.init({
    group_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'groups',
  });
  return groups;
};