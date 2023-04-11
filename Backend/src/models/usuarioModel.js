"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Usuario",
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      ID_Instituicao: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Usuario",
      timestamps: false,
    }
  );
};
