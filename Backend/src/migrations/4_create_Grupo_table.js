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
      Categoria: {
        type: Sequelize.STRING(255),
      },
      Privado: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Grupo");
  },
};
