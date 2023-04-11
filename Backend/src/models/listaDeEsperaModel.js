"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ListaDeEspera",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ID_Instituicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Instituicao",
          key: "ID",
        },
        onDelete: "CASCADE",
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
    },
    {
      tableName: "ListaDeEspera",
      timestamps: false,
    }
  );
};
