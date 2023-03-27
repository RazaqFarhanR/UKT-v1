'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lembar_soal', {
      id_lembar_soal: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_ranting: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ranting",
          key: "id_ranting"
        }
      },
      tipe_soal: {
        type: Sequelize.ENUM('ukt_jambon', 'ukt_putih', 'ukt_hijau', 'ukcw')
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
    await queryInterface.dropTable('lembar_soal');
  }
};