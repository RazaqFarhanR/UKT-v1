'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.siswa, {
        foreignKey: "id_event",
        as: "siswa_event"
      })
      this.hasMany(models.ukcw, {
        foreignKey: "id_event",
        as: "event_ukcw"
      })
      this.hasMany(models.ukt_hijau, {
        foreignKey: "id_event",
        as: "event_hijau"
      })
      this.hasMany(models.ukt_putih, {
        foreignKey: "id_event",
        as: "event_putih"
      })
      this.hasMany(models.ukt_jambon, {
        foreignKey: "id_event",
        as: "event_jambon"
      })
    }
  }
  event.init({
    id_event: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    tipe_ukt: DataTypes.ENUM('UKT Jambon','UKT Hijau','UKT Putih','UKCW'),
  }, {
    sequelize,
    modelName: 'event',
    tableName: 'event'
  });
  return event;
};