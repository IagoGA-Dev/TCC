"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Banido",
      [
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Banido", null, {});
  },
};
