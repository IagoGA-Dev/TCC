"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ListaDeEspera",
      [
        {
          ID: null,
          ID_Instituicao: 2,
          ID_Usuario: 3,
        },
        {
          ID: null,
          ID_Instituicao: 2,
          ID_Usuario: 2,
        },
        {
          ID: null,
          ID_Instituicao: 3,
          ID_Usuario: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ListaDeEspera", null, {});
  },
};
