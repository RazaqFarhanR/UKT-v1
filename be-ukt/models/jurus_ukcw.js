"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jurus_ukcw extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "jurus_ukcw_siswa"
      });
    }
  }
  jurus_ukcw.init(
    {
      id_jurus_ukcw: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      id_siswa: DataTypes.INTEGER,
      jurus1A: DataTypes.BOOLEAN,
      jurus1B: DataTypes.BOOLEAN,
      jurus2A: DataTypes.BOOLEAN,
      jurus2B: DataTypes.BOOLEAN,
      jurus3A: DataTypes.BOOLEAN,
      jurus3B: DataTypes.BOOLEAN,
      jurus4A: DataTypes.BOOLEAN,
      jurus4B: DataTypes.BOOLEAN,
      jurus4C: DataTypes.BOOLEAN,
      jurus4D: DataTypes.BOOLEAN,
      jurus5: DataTypes.BOOLEAN,
      jurus6: DataTypes.BOOLEAN,
      jurus7A: DataTypes.BOOLEAN,
      jurus7B: DataTypes.BOOLEAN,
      jurus8A: DataTypes.BOOLEAN,
      jurus8B: DataTypes.BOOLEAN,
      jurus8C: DataTypes.BOOLEAN,
      jurus9: DataTypes.BOOLEAN,
      jurus10A: DataTypes.BOOLEAN,
      jurus10B: DataTypes.BOOLEAN,
      jurus11A: DataTypes.BOOLEAN,
      jurus11B: DataTypes.BOOLEAN,
      jurus12: DataTypes.BOOLEAN,
      jurus13: DataTypes.BOOLEAN,
      jurus14A: DataTypes.BOOLEAN,
      jurus14B: DataTypes.BOOLEAN,
      jurus15: DataTypes.BOOLEAN,
      jurus16A1: DataTypes.BOOLEAN,
      jurus16A2: DataTypes.BOOLEAN,
      jurus16B: DataTypes.BOOLEAN,
      jurus17A: DataTypes.BOOLEAN,
      jurus17B: DataTypes.BOOLEAN,
      jurus18A: DataTypes.BOOLEAN,
      jurus18B: DataTypes.BOOLEAN,
      jurus19A: DataTypes.BOOLEAN,
      jurus19B: DataTypes.BOOLEAN,
      jurus20A: DataTypes.BOOLEAN,
      jurus20B: DataTypes.BOOLEAN,
      jurus21: DataTypes.BOOLEAN,
      jurus22: DataTypes.BOOLEAN,
      jurus23A: DataTypes.BOOLEAN,
      jurus23B: DataTypes.BOOLEAN,
      jurus24A: DataTypes.BOOLEAN,
      jurus24B: DataTypes.BOOLEAN,
      jurus25A: DataTypes.BOOLEAN,
      jurus25B: DataTypes.BOOLEAN,
      jurus26: DataTypes.BOOLEAN,
      jurus27A1: DataTypes.BOOLEAN,
      jurus27A2: DataTypes.BOOLEAN,
      jurus27A3: DataTypes.BOOLEAN,
      jurus27B: DataTypes.BOOLEAN,
      jurus28: DataTypes.BOOLEAN,
      jurus29A: DataTypes.BOOLEAN,
      jurus29B: DataTypes.BOOLEAN,
      jurus30: DataTypes.BOOLEAN,
      jurus31: DataTypes.BOOLEAN,
      jurus32: DataTypes.BOOLEAN,
      jurus33: DataTypes.BOOLEAN,
      jurus34: DataTypes.BOOLEAN,
      jurus35: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "jurus_ukcw",
      tableName: "jurus_ukcw",
    }
  );
  return jurus_ukcw;
};
