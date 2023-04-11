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
          Texto: "Olá, pessoal! Bem-vindos ao nosso grupo de estudo!",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 2,
          Data: "2022-01-01 10:01:00",
          ID_Grupo: 2,
          Texto: "Oi, tudo bem?",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:02:00",
          ID_Grupo: 2,
          Texto: "Tudo certo e com você?",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:03:00",
          ID_Grupo: 2,
          Texto: "Estou bem também. Vamos começar a estudar?",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 1,
          Data: "2022-01-01 10:04:00",
          ID_Grupo: 2,
          Texto: "Claro! O que acham de começarmos com o exercício 3?",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 2,
          Data: "2022-01-01 10:05:00",
          ID_Grupo: 2,
          Texto: "Tudo bem!",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 3,
          Data: "2022-01-01 10:06:00",
          ID_Grupo: 2,
          Texto: "Também acho!",
          Imagem: null,
        },
        {
          ID: null,
          ID_Usuario: 1,
          Data: "2022-01-01 10:07:00",
          ID_Grupo: 2,
          Texto: null,
          Imagem: "/GRUPO_1/Exercicio3.png",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Mensagem", null, {});
  },
};
