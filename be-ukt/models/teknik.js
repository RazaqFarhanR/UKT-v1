'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teknik extends Model {
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
    }
  }
  teknik.init({
    id_teknik: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    teknik1: DataTypes.STRING,
    teknik2: DataTypes.STRING,
    teknik3: DataTypes.STRING,
    teknik4: DataTypes.STRING,
    teknik5: DataTypes.STRING,
    teknik6: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'teknik',
    tableName: 'teknik'
  });
  return teknik;
};