'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jurus_ukcw', {
      id_jurus_ukcw: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id_siswa"
        }
      },
      jurus1A: {
        type: Sequelize.BOOLEAN
      },
      jurus1B: {
        type: Sequelize.BOOLEAN
      },
      jurus2A: {
        type: Sequelize.BOOLEAN
      },
      jurus2B: {
        type: Sequelize.BOOLEAN
      },
      jurus3A: {
        type: Sequelize.BOOLEAN
      },
      jurus3B: {
        type: Sequelize.BOOLEAN
      },
      jurus4A: {
        type: Sequelize.BOOLEAN
      },
      jurus4B: {
        type: Sequelize.BOOLEAN
      },
      jurus4C: {
        type: Sequelize.BOOLEAN
      },
      jurus4D: {
        type: Sequelize.BOOLEAN
      },
      jurus5: {
        type: Sequelize.BOOLEAN
      },
      jurus6: {
        type: Sequelize.BOOLEAN
      },
      jurus7A: {
        type: Sequelize.BOOLEAN
      },
      jurus7B: {
        type: Sequelize.BOOLEAN
      },
      jurus8A: {
        type: Sequelize.BOOLEAN
      },
      jurus8B: {
        type: Sequelize.BOOLEAN
      },
      jurus8C: {
        type: Sequelize.BOOLEAN
      },
      jurus9: {
        type: Sequelize.BOOLEAN
      },
      jurus10A: {
        type: Sequelize.BOOLEAN
      },
      jurus10B: {
        type: Sequelize.BOOLEAN
      },
      jurus11A: {
        type: Sequelize.BOOLEAN
      },
      jurus11B: {
        type: Sequelize.BOOLEAN
      },
      jurus12: {
        type: Sequelize.BOOLEAN
      },
      jurus13: {
        type: Sequelize.BOOLEAN
      },
      jurus14A: {
        type: Sequelize.BOOLEAN
      },
      jurus14B: {
        type: Sequelize.BOOLEAN
      },
      jurus15: {
        type: Sequelize.BOOLEAN
      },
      jurus16A1: {
        type: Sequelize.BOOLEAN
      },
      jurus16A2: {
        type: Sequelize.BOOLEAN
      },
      jurus16B: {
        type: Sequelize.BOOLEAN
      },
      jurus17A: {
        type: Sequelize.BOOLEAN
      },
      jurus17B: {
        type: Sequelize.BOOLEAN
      },
      jurus18A: {
        type: Sequelize.BOOLEAN
      },
      jurus18B: {
        type: Sequelize.BOOLEAN
      },
      jurus19A: {
        type: Sequelize.BOOLEAN
      },
      jurus19B: {
        type: Sequelize.BOOLEAN
      },
      jurus20A: {
        type: Sequelize.BOOLEAN
      },
      jurus20B: {
        type: Sequelize.BOOLEAN
      },
      jurus21: {
        type: Sequelize.BOOLEAN
      },
      jurus22: {
        type: Sequelize.BOOLEAN
      },
      jurus23A: {
        type: Sequelize.BOOLEAN
      },
      jurus23B: {
        type: Sequelize.BOOLEAN
      },
      jurus24A: {
        type: Sequelize.BOOLEAN
      },
      jurus24B: {
        type: Sequelize.BOOLEAN
      },
      jurus25A: {
        type: Sequelize.BOOLEAN
      },
      jurus25B: {
        type: Sequelize.BOOLEAN
      },
      jurus26: {
        type: Sequelize.BOOLEAN
      },
      jurus27A1: {
        type: Sequelize.BOOLEAN
      },
      jurus27A2: {
        type: Sequelize.BOOLEAN
      },
      jurus27A3: {
        type: Sequelize.BOOLEAN
      },
      jurus27B: {
        type: Sequelize.BOOLEAN
      },
      jurus28: {
        type: Sequelize.BOOLEAN
      },
      jurus29A: {
        type: Sequelize.BOOLEAN
      },
      jurus29B: {
        type: Sequelize.BOOLEAN
      },
      jurus30: {
        type: Sequelize.BOOLEAN
      },
      jurus31: {
        type: Sequelize.BOOLEAN
      },
      jurus32: {
        type: Sequelize.BOOLEAN
      },
      jurus33: {
        type: Sequelize.BOOLEAN
      },
      jurus34: {
        type: Sequelize.BOOLEAN
      },
      jurus35: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jurus_ukcw');
  }
};