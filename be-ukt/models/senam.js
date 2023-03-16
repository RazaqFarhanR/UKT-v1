'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class senam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "senam"
      })
    }
  }
  senam.init({
    id_senam: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    id_siswa: DataTypes.INTEGER,
    senam69: DataTypes.BOOLEAN,
    senam23: DataTypes.BOOLEAN,
    senam14: DataTypes.BOOLEAN,
    senam90: DataTypes.BOOLEAN,
    senam61: DataTypes.BOOLEAN,
    senam49: DataTypes.BOOLEAN,
    senam59: DataTypes.BOOLEAN,
    senam64: DataTypes.BOOLEAN,
    senam12: DataTypes.BOOLEAN,
    senam33: DataTypes.BOOLEAN,
    senam44: DataTypes.BOOLEAN,
    senam11: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'senam',
    tableName: 'senam'
  });
  return senam;
};