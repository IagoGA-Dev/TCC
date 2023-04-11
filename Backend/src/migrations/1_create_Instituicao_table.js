"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Instituicao", {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      Siglas: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true,
      },
      Logo: {
        type: Sequelize.STRING(255),
      },
      Descricao: {
        type: Sequelize.TEXT,
      },
      UsaListaEspera: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Instituicao");
  },
};
