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
      Data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Mensagem: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Tipo: {
        type: Sequelize.ENUM("Texto", "Imagem", "Arquivo"),
        allowNull: false,
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
      ID_Grupo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Grupo",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
    },);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Mensagem");
  },
};
