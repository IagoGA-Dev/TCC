module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Tarefa',
        {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            ID_Usuario: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Usuario',
                    key: 'ID'
                },
            },
            Titulo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Descricao: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Status: {
                type: DataTypes.ENUM('pendente', 'em desenvolvimento', 'terminado'),
                allowNull: false,
                defaultValue: 'pendente',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            },
        },
        {
            tableName: 'Tarefa',
            timestamps: true,
        }
    );
};