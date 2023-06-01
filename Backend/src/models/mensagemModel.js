"use strict";

module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define(
    "Mensagem",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Mensagem: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Tipo: {
        type: DataTypes.ENUM("Texto", "Imagem", "Arquivo"),
        allowNull: false,
      },
      ID_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
      ID_Grupo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Grupo",
          key: "ID",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "Mensagem",
      timestamps: false,
    }
  );

  return Mensagem;
};
