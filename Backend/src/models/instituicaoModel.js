"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Instituicao",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Siglas: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Logo: {
        type: DataTypes.STRING,
      },
      Descricao: {
        type: DataTypes.TEXT,
      },
      UsaListaEspera: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      tableName: "Instituicao",
      timestamps: false,
    }
  );
};
