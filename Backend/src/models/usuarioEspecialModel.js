"use strict";

module.exports = (sequelize, DataTypes) => {
  const UsuarioEspecial = sequelize.define(
    "UsuarioEspecial",
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
      Tipo: {
        type: DataTypes.ENUM(["Assistente", "Professor", "Moderador"]),
        allowNull: false,
      },
      ID_GrupoModerado: {
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
      tableName: "UsuarioEspecial",
      timestamps: false,
    }
  );

  return UsuarioEspecial;
};
