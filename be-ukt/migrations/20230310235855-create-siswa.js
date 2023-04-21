'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('siswa', {
      id_siswa: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_event: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "event",
          key: "id_event"
        }
      },
      nis: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      id_role: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "role",
          key: "id_role"
        }
      },
      jenis_latihan: {
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        type: Sequelize.ENUM('pria', 'perempuan')
      },
      tipe_ukt: {
        type: Sequelize.ENUM('UKT Jambon','UKT Hijau','UKT Putih','UKCW')
      },
      id_ranting: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ranting",
          key: "id_ranting"
        }
      },
      rayon: {
        type: Sequelize.STRING
      },
      tingkatan: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('siswa');
  }
};