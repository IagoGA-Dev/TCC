"use strict";

module.exports = (sequelize, DataTypes) => {
  const UsuarioGrupo = sequelize.define(
    "UsuarioGrupo",
    {
      ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      tableName: "UsuarioGrupo",
      timestamps: false,
    }
  );
  return UsuarioGrupo;
};
