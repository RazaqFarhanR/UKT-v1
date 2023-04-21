'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class penguji extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, {
        foreignKey: "id_role",
        as: "penguji"
      })
      this.belongsTo(models.ranting, {
        foreignKey: "id_ranting",
        as: "penguji_ranting"
      })
      this.belongsTo(models.cabang, {
        foreignKey: "id_cabang",
        as: "penguji_cabang"
      })
    }
  }
  penguji.init({
    id_penguji: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    NIW: DataTypes.STRING,
    name: DataTypes.STRING,
    id_role: DataTypes.STRING,
    id_ranting: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_cabang: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    username: DataTypes.STRING,
    foto: DataTypes.STRING,
    password: DataTypes.STRING,
    no_wa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'penguji',
    tableName: 'penguji'
  });
  return penguji;
};