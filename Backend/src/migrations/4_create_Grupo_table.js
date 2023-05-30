"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Grupo", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Nome: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      Descricao: {
        type: Sequelize.STRING(255),
      },
      Categoria: {
        type: Sequelize.STRING(255),
      },
      Imagem: {
        type: Sequelize.STRING(255),
      },
      Membros: {
        type: Sequelize.INTEGER,
      },
      ID_Criador: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ID_Instituicao: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      ID_Assistente: {
        type: Sequelize.INTEGER,
      },
      Privado: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Grupo");
  },
};