'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fisik', {
      id_fisik: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id_siswa"
        }
      },
      id_fisik: {
        type: Sequelize.INTEGER
      },
      mft: {
        type: Sequelize.INTEGER
      },
      push_up: {
        type: Sequelize.INTEGER
      },
      spir_perut_atas: {
        type: Sequelize.INTEGER
      },
      spir_perut_bawah: {
        type: Sequelize.INTEGER
      },
      spir_dada: {
        type: Sequelize.INTEGER
      },
      plank: {
        type: Sequelize.ENUM('kurang', 'cukup', 'baik')
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
    await queryInterface.dropTable('fisiks');
  }
};