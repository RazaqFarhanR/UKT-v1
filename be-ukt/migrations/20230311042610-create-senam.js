'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('senam', {
      id_senam: {
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
      senam69: {
        type: Sequelize.BOOLEAN
      },
      senam23: {
        type: Sequelize.BOOLEAN
      },
      senam14: {
        type: Sequelize.BOOLEAN
      },
      senam90: {
        type: Sequelize.BOOLEAN
      },
      senam61: {
        type: Sequelize.BOOLEAN
      },
      senam49: {
        type: Sequelize.BOOLEAN
      },
      senam59: {
        type: Sequelize.BOOLEAN
      },
      senam64: {
        type: Sequelize.BOOLEAN
      },
      senam12: {
        type: Sequelize.BOOLEAN
      },
      senam33: {
        type: Sequelize.BOOLEAN
      },
      senam44: {
        type: Sequelize.BOOLEAN
      },
      senam11: {
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
    await queryInterface.dropTable('senam');
  }
};