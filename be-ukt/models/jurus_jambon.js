"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jurus_jambon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.siswa, {
        foreignKey: "id_siswa",
        as: "jurus_jambon_siswa"
      });
    }
  }
  jurus_jambon.init(
    {
      id_jurus_jambon: {
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
    },
    {
      sequelize,
      modelName: "jurus_jambon",
      tableName: "jurus_jambon",
    }
  );
  return jurus_jambon;
};
