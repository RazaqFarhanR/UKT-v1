'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ukt_putih extends Model {
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
      this.belongsTo(models.rayon, {
        foreignKey: "id_rayon",
        as: "rayon"
      })
      this.belongsTo(models.event, {
        foreignKey: "id_event",
        as: "event_putih"
      })
    }
  }
  ukt_putih.init({
    id_ukt_putih: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_siswa: DataTypes.INTEGER,
    id_event: DataTypes.INTEGER,
    id_rayon: DataTypes.INTEGER,
    keshan: DataTypes.INTEGER,
    senam: DataTypes.INTEGER,
    jurus: DataTypes.INTEGER,
    fisik: DataTypes.INTEGER,
    teknik: DataTypes.INTEGER,
    sambung: DataTypes.INTEGER,
    sambung: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ukt_putih',
    tableName: 'ukt_putih'
  });
  return ukt_putih;
};