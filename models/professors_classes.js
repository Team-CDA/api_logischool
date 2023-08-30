"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class professors_classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.classes, { foreignKey: "id_class" });
      this.belongsTo(models.users, { foreignKey: "id_professor" });
    }
  }
  professors_classes.init(
    {
      id_professor: DataTypes.INTEGER,
      id_class: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "professors_classes",
    }
  );
  return professors_classes;
};
