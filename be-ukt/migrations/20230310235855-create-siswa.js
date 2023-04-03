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
        type: Sequelize.INTEGER
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
      id_ranting: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ranting",
          key: "id_ranting"
        }
      },
      id_rayon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "rayon",
          key: "id_rayon"
        }
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