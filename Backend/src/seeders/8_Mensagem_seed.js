"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Mensagem",
      [
        {
          ID: null,
          ID_Usuario: 1,
          Data: "2022-01-01 10:00:00",
          ID_Grupo: 2,
          Mensagem: "Olá, pessoal! Bem-vindos ao nosso grupo de estudo!",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 2,
          Data: "2022-01-01 10:01:00",
          ID_Grupo: 2,
          Mensagem: "Oi, tudo bem?",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:02:00",
          ID_Grupo: 2,
          Mensagem: "Tudo certo e com você?",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:03:00",
          ID_Grupo: 2,
          Mensagem: "Estou bem também. Vamos começar a estudar?",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 1,
          Data: "2022-01-01 10:04:00",
          ID_Grupo: 2,
          Mensagem: "Claro! O que acham de começarmos com o exercício 3?",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 2,
          Data: "2022-01-01 10:05:00",
          ID_Grupo: 2,
          Mensagem: "Tudo bem!",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:06:00",
          ID_Grupo: 2,
          Mensagem: "Também acho!",
          Tipo: "Texto",
        },
        {
          ID: null,
          ID_Usuario: 1,
          Data: "2022-01-01 10:07:00",
          ID_Grupo: 2,
          Mensagem: "/GRUPO_1/Exercicio3.png",
          Tipo: "Imagem",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Mensagem", null, {});
  },
};
