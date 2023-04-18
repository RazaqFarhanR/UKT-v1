'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jurus_jambon', {
      id_jurus_jambon: {
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
    await queryInterface.dropTable('jurus_jambon');
  }
};