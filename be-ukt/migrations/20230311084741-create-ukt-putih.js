'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ukt_putih', {
      id_ukt_putih: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_siswa: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references: {
          model: "siswa",
          key: "id_siswa"
        }
      },
      id_event: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "event",
          key: "id_event"
        }
      },
      id_rayon: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "rayon",
          key: "id_rayon"
        }
      },
      keshan: {
        type: Sequelize.INTEGER
      },
      senam: {
        type: Sequelize.INTEGER
      },
      jurus: {
        type: Sequelize.INTEGER
      },
      fisik: {
        type: Sequelize.INTEGER
      },
      teknik: {
        type: Sequelize.INTEGER
      },
      sambung: {
        type: Sequelize.INTEGER
      },
      sambung: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ukt_putih');
  }
};