'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rayon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ranting, {
        foreignKey: "id_ranting",
        as: "rayon_ranting"
      })
    }
  }
  rayon.init({
    id_rayon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_ranting: DataTypes.INTEGER,
    name: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rayon',
    tableName: 'rayon'
  });
  return rayon;
};