"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario", {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      Email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      Senha: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      Salt: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      CPF: {
        allowNull: false,
        type: Sequelize.STRING(11),
        unique: true,
      },
      ID_Instituicao: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Instituicao",
          key: "ID",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Usuario");
  },
};
