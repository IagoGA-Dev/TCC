"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Usuario",
      [
        {
          ID: null,
          Nome: "João Silva",
          Email: "joao.silva@ifsp.br",
          Senha: "9a7e7f1d4c7849abc45e81f24a04fe32",
          Salt: "salt123",
          CPF: "12345678901",
          ID_Instituicao: 1,
        },
        {
          ID: null,
          Nome: "Maria Santos",
          Email: "maria.santos@usp.br",
          Senha: "76c0380ec3703dd1388b8f7a2cacc39e",
          Salt: "salt456",
          CPF: "23456789012",
          ID_Instituicao: 2,
        },
        {
          ID: null,
          Nome: "Pedro Souza",
          Email: "pedro.souza@ufpe.br",
          Senha: "a06d7e6319ffd18ba1ddc830489136ee",
          Salt: "salt789",
          CPF: "34567890123",
          ID_Instituicao: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Usuario", null, {});
  },
};
