"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Instituicao",
      [
        {
          ID: 1,
          Nome: "Sem Instituição",
          Siglas: "N/A",
          Logo: "N/A",
          Descricao: "N/A",
          UsaListaEspera: 0,
        },
        {
          ID: null,
          Nome: "Instituto Federal de Educação, Ciência e Tecnologia de São Paulo",
          Siglas: "IFSP",
          Logo: "IFSP_Logo.png",
          Descricao: "Instituição de ensino superior",
          UsaListaEspera: 1,
        },
        {
          ID: null,
          Nome: "Universidade de São Paulo",
          Siglas: "USP",
          Logo: "USP_Logo.png",
          Descricao: "Instituição de ensino superior",
          UsaListaEspera: 1,
        },
        {
          ID: null,
          Nome: "Universidade Federal de Pernambuco",
          Siglas: "UFPE",
          Logo: "UFPE_Logo.png",
          Descricao: "Instituição de ensino superior",
          UsaListaEspera: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Instituicao", null, {});
  },
};
