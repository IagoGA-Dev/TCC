"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UsuarioGrupo",
      [
        {
          ID: null,
          ID_Usuario: 1,
          ID_Grupo: 2,
        },
        {
          ID: null,
          ID_Usuario: 2,
          ID_Grupo: 2,
        },
        {
          ID: null,
          ID_Usuario: 3,
          ID_Grupo: 3,
        },
        {
          ID: null,
          ID_Usuario: 1,
          ID_Grupo: 4,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UsuarioGrupo", null, {});
  },
};
