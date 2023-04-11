"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Grupo",
      [
        {
          ID: 1,
          Nome: "Todos os grupos",
          Categoria: "N/A",
          Privado: 0,
        },
        {
          ID: null,
          Nome: "Algoritmos",
          Categoria: "Computação",
          Privado: 0,
        },
        {
          ID: null,
          Nome: "Programação Web",
          Categoria: "Computação",
          Privado: 0,
        },
        {
          ID: null,
          Nome: "Estatística Discreta",
          Categoria: "Matemática",
          Privado: 1,
        },
        {
          ID: null,
          Nome: "Política",
          Categoria: "Ciências Sociais",
          Privado: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Grupo", null, {});
  },
};
