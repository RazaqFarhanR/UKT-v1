'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jurus_siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa,{
        foreignKey: "id_siswa",
        as: "jurus_siswa"
      })
      this.belongsTo(models.jurus, {
        foreignKey: "id_jurus",
        as: "jurus"
      })
    }
  }
  jurus_siswa.init({
    id_jurus_siswa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_siswa: DataTypes.INTEGER,
    id_jurus: DataTypes.INTEGER,
    predikat: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'jurus_siswa',
    tableName: 'jurus_siswa',
  });
  return jurus_siswa;
};