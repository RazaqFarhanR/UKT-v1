'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lembar_soal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.soal, {
        foreignKey: "id_lembar_soal",
        as: "lembar_soal"
      })
      this.hasMany(models.session, {
        foreignKey: "id_lembar_soal",
        as: "lembar_session"
      })
    }
  }
  lembar_soal.init({
    id_lembar_soal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    
    id_ranting: DataTypes.INTEGER,
    tipe_soal: DataTypes.ENUM('ukt_jambon', 'ukt_putih', 'ukt_hijau', 'ukcw')
  }, {
    sequelize,
    modelName: 'lembar_soal',
    tableName: 'lembar_soal',
  });
  return lembar_soal;
};