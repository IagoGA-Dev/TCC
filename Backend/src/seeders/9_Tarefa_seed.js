"use strict";

/** @type {import('sequelize-cli').Migration}*/
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            "Tarefa",
            [
                {
                    ID: null,
                    ID_Usuario: 4,
                    Titulo: "Tarefa 1",
                    Descricao: "Descrição da tarefa 1",
                    Status: "pendente",
                },
                {
                    ID: null,
                    ID_Usuario: 4,
                    Titulo: "Tarefa 2",
                    Descricao: "Descrição da tarefa 2",
                    Status: "em desenvolvimento",
                },
                {
                    ID: null,
                    ID_Usuario: 4,
                    Titulo: "Tarefa 3",
                    Descricao: "Descrição da tarefa 3",
                    Status: "terminado",
                },
            ]
        );
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Tarefa", null, {});
    }
};