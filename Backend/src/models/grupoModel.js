"use strict";
module.exports = (sequelize, DataTypes) => {
  const Grupo = sequelize.define(
    "Grupo",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      Descricao: {
        type: DataTypes.STRING(255),
      },
      Categoria: {
        type: DataTypes.STRING(255),
      },
      Imagem: {
        type: DataTypes.STRING(255),
      },
      Membros: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      ID_Criador: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ID_Instituicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ID_Assistente: {
        type: DataTypes.INTEGER,
      },
      Privado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "Grupo",
      timestamps: false,
    }
  );

  return Grupo;
};
