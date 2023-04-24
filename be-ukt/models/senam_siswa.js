'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class senam_siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "senam_siswa"
      })
      this.belongsTo(models.senam, {
        foreignKey: "id_senam",
        as: "siswa_senam"
      })
      this.belongsTo(models.event, {
        foreignKey: "id_event",
        as: "event_senam"
      })
    }
  }
  senam_siswa.init({
    id_senam_siswa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    id_event: DataTypes.INTEGER,
    id_siswa: DataTypes.INTEGER,
    id_senam: DataTypes.INTEGER,
    predikat: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'senam_siswa',
    tableName: 'senam_siswa',
  });
  return senam_siswa;
};