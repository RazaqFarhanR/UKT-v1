'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.lembar_soal, {
        foreignKey: "id_lembar_soal",
        as: "lembar_soal"
      })
      this.hasMany(models.kunci_soal, {
        foreignKey: "id_soal",
        as: "soal"
      })
    }
  }
  soal.init({
    id_soal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_lembar_soal: DataTypes.INTEGER,
    pertanyaan: DataTypes.STRING,
    opsi1: DataTypes.STRING,
    opsi2: DataTypes.STRING,
    opsi3: DataTypes.STRING,
    opsi4: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soal',
    tableName: 'soal',
  });
  return soal;
};