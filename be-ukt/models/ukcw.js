'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ukcw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "id_siswa",
        as: "siswa"
      })
      this.belongsTo(models.event, {
        foreignKey: "id_event",
        as: "event_ukcw"
      })
    }
  }
  ukcw.init({
    id_ukcw: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_siswa: DataTypes.INTEGER,
    id_event: DataTypes.INTEGER,
    rayon: DataTypes.STRING,
    keshan: DataTypes.INTEGER,
    senam: DataTypes.INTEGER,
    jurus: DataTypes.INTEGER,
    fisik: DataTypes.INTEGER,
    teknik: DataTypes.INTEGER,
    sambung: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ukcw',
    tableName: 'ukcw'
  });
  return ukcw;
};