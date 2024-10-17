import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './usuario.Model';  // Relacionamento com o modelo de Usuário

class Agendamento extends Model {
    public id!: number;
    public consulta!: string;
    public nomePaciente!: string;
    public status!: string;
    public idade!: number;
    public dataAgendamento!: Date;
    public descricao!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public userId!: number; // Relacionamento com Usuário
}

export const initAgendamentoModel = (sequelize: Sequelize) => {
    Agendamento.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            consulta: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            nomePaciente: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            idade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            dataAgendamento: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            descricao: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: User, // Relaciona com o modelo User
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'agendamentos',
            timestamps: true,
        }
    );
};

export default Agendamento;
