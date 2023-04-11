"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UsuarioEspecial", {
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
      Tipo: {
        type: Sequelize.ENUM(["Assistente", "Professor", "Moderador"]),
        allowNull: false,
      },
      ID_GrupoModerado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Grupo",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UsuarioEspecial");
  },
};
