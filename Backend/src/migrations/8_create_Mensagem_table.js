"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mensagem", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_Usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
      Data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ID_Grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Grupo",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
      Texto: {
        type: Sequelize.TEXT,
      },
      Imagem: {
        type: Sequelize.STRING(255),
      },
      Arquivo: {
        type: Sequelize.STRING(255),
      },
      Tamanho: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Mensagem");
  },
};
