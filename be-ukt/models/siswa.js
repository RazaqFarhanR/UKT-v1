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
      this.belongsTo(models.rayon, {
        foreignKey: "id_rayon",
        as: "siswa_rayon",
      })
      this.belongsTo(models.ranting, {
        foreignKey: "id_ranting",
        as: "siswa_ranting"
      })
      this.belongsTo(models.event, {
        foreignKey: "id_event",
        as: "siswa_event"
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
      this.hasMany(models.siswa, {
        foreignKey: "id_siswa",
        as: "sambung_siswa"
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
    id_event: DataTypes.INTEGER,
    nis: DataTypes.INTEGER,
    name: DataTypes.STRING,
    id_role: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('pria', 'perempuan'),
    jenis_latihan: DataTypes.ENUM('Reguler','Privat'),
    tipe_ukt: DataTypes.ENUM('UKT Jambon','UKT Hijau','UKT Putih','UKCW'),
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