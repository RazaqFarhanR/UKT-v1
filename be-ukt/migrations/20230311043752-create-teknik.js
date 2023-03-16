'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teknik', {
      id_teknik: {
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
      teknik1: {
        type: Sequelize.STRING
      },
      teknik2: {
        type: Sequelize.STRING
      },
      teknik3: {
        type: Sequelize.STRING
      },
      teknik4: {
        type: Sequelize.STRING
      },
      teknik5: {
        type: Sequelize.STRING
      },
      teknik6: {
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
    await queryInterface.dropTable('tekniks');
  }
};