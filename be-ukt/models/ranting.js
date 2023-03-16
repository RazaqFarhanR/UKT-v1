'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ranting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.penguji, {
        foreignKey: "id_ranting",
        as: "penguji_ranting"
      })
      this.hasMany(models.siswa, {
        foreignKey: "id_ranting",
        as: "siswa_ranting"
      })
      this.hasMany(models.rayon, {
        foreignKey: "id_ranting",
        as: "rayon_ranting"
      })
    }
  }
  ranting.init({
    id_ranting: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    id_cabang: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ranting',
    tableName: 'ranting'
  });
  return ranting;
};