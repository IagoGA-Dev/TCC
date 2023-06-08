'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tarefa', {
      ID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ID_Usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'ID'
        }
       },
      Titulo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      Status: {
        type: Sequelize.ENUM('pendente', 'em desenvolvimento', 'terminado'),
        allowNull: false,
        defaultValue: 'pendente'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tarefa');
  },
};