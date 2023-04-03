'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, {
        foreignKey: "id_role",
        as: "siswa_role"
      })
      this.belongsTo(models.ranting, {
        foreignKey: "id_ranting",
        as: "siswa_ranting"
      })
      this.belongsTo(models.event, {
        foreign: "id_event",
        as: "event_siswa"
      })
      this.hasMany(models.senam, {
        foreignKey: "id_siswa",
        as: "senam"
      })
      this.hasMany(models.jurus, {
        foreignKey: "id_siswa",
        as: "jurus"
      })
      this.hasMany(models.fisik, {
        foreignKey: "id_siswa",
        as: "fisik"
      })
      this.hasMany(models.teknik, {
        foreignKey: "id_siswa",
        as: "teknik"
      })
      this.hasMany(models.ukcw, {
        foreignKey: "id_siswa",
        as: "ukcw"
      })
      this.hasMany(models.ukt_hijau, {
        foreignKey: "id_siswa",
        as: "ukt_hijau"
      })
      this.hasMany(models.ukt_jambon, {
        foreignKey: "id_siswa",
        as: "ukt_jambon"
      })
      this.hasMany(models.ukt_putih, {
        foreignKey: "id_siswa",
        as: "ukt_putih"
      })
    }
  }
  siswa.init({
    id_siswa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nis: DataTypes.INTEGER,
    name: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('pria', 'perempuan'),
    id_role: DataTypes.STRING,
    jenis_latihan: DataTypes.STRING,
    id_ranting: DataTypes.INTEGER,
    id_rayon: {
      type:DataTypes.INTEGER,
      allowNull: true
    },
    tingkatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
    tableName: 'siswa'
  });
  return siswa;
};