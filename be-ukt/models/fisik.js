'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class fisik extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "siswa"
      })
    }
  }
  fisik.init({
    id_fisik: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mft: DataTypes.INTEGER,
    push_up: DataTypes.INTEGER,
    spir_perut_atas: DataTypes.INTEGER,
    spir_perut_bawah: DataTypes.INTEGER,
    spir_dada: DataTypes.INTEGER,
    plank: DataTypes.ENUM('kurang', 'cukup', 'baik')
  }, {
    sequelize,
    modelName: 'fisik',
    tableName: 'fisik'
  });
  return fisik;
};