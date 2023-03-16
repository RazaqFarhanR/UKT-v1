'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jurus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {
        foreignKey: "id_siswa",
        as: "jurus"
      })
    }
  }
  jurus.init({
    id_jurus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_siswa: DataTypes.INTEGER,
    jurus1A: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'jurus',
    tableName: 'jurus'
  });
  return jurus;
};