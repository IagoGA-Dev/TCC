"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "UsuarioEspecial",
      [
        {
          ID: null,
          ID_Usuario: 1,
          Tipo: "Assistente",
          ID_GrupoModerado: 2,
        },
        {
          ID: null,
          ID_Usuario: 2,
          Tipo: "Professor",
          ID_GrupoModerado: 2,
        },
        {
          ID: null,
          ID_Usuario: 3,
          Tipo: "Moderador",
          ID_GrupoModerado: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("UsuarioEspecial", null, {});
  },
};
