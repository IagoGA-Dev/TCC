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
          Descricao: "Todos os grupos",
          Categoria: "N/A",
          Imagem: "https://picsum.photos/200",
          Membros: 0,
          ID_Criador: 1,
          ID_Instituicao: 1,
          ID_Assistente: null,
          Privado: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ID: null,
          Nome: "Algoritmos",
          Descricao: "Algoritmos e Lógica de Programação",
          Categoria: "Computação",
          Imagem: "https://picsum.photos/200",
          Membros: 0,
          ID_Criador: 1,
          ID_Instituicao: 1,
          ID_Assistente: null,
          Privado: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ID: null,
          Nome: "Programação Web",
          Descricao: "Programação WEB com HTML, CSS e JavaScript",
          Categoria: "Computação",
          Imagem: "https://picsum.photos/200",
          Membros: 0,
          ID_Criador: 1,
          ID_Instituicao: 1,
          ID_Assistente: null,
          Privado: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ID: null,
          Nome: "Estatística Discreta",
          Descricao: "Estatística Discreta (Probabilidade)",
          Categoria: "Matemática",
          Imagem: "https://picsum.photos/200",
          Membros: 0,
          ID_Criador: 1,
          ID_Instituicao: 1,
          ID_Assistente: null,
          Privado: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ID: null,
          Nome: "Política",
          Descricao: "Política e Sociedade",
          Categoria: "Ciências Sociais",
          Imagem: "https://picsum.photos/200",
          Membros: 0,
          ID_Criador: 1,
          ID_Instituicao: 1,
          ID_Assistente: null,
          Privado: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Grupo", null, {});
  },
};
