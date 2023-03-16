'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pengurus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.role, {
        foreignKey: "id_role",
        as: "pengurus"
      })
    }
  }
  pengurus.init({
    id_pengurus: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: DataTypes.STRING,
    id_role: DataTypes.STRING,
    id_ranting: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    no_wa: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pengurus',
    tableName: 'pengurus'
  });
  return pengurus;
};