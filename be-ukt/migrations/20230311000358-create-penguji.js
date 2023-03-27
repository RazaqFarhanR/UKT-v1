'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('penguji', {
      id_penguji: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      id_ranting: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "ranting",
          key: "id_ranting"
        }
      },
      id_cabang: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "cabang",
          key: "id_cabang"
        }
      },
      username: {
        type: Sequelize.STRING
      },      
      foto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING
      },
      no_wa: {
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
    await queryInterface.dropTable('penguji');
  }
};