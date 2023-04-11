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
      Categoria: {
        type: DataTypes.STRING(255),
      },
      Privado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      tableName: "Grupo",
      timestamps: false,
    }
  );

  return Grupo;
};
