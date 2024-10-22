import { Model, DataTypes, Sequelize } from 'sequelize';
import User from './usuario.Model';  // Relacionamento com o modelo de Usuário
import { v4 as uuidv4 } from 'uuid';

class AgendamentoViagens extends Model {
    public id!: number;
    public consulta!: string;
    public nomePaciente!: string;
    public status!: string;
    public idade!: number;
    public dataAgendamento!: Date;
    public descricao!: string;
    public tipoCarro!: string;
    public nomeMotorista!: string;
    public cidadeDestino!: string;
    public tipoConsulta!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public userId!: number; // Relacionamento com Usuário
}

export const initAgendamentoViagensModel = (sequelize: Sequelize) => {
    AgendamentoViagens.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4,
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
            tipoCarro: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            nomeMotorista: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            cidadeDestino: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            tipoConsulta: {
                type: DataTypes.STRING(255),
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
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: User, // Relaciona com o modelo User
                    key: 'id',
                },
            },
        },
        {
            sequelize,
            tableName: 'agendamentosViagens',
            timestamps: true,
        }
    );
};

export default AgendamentoViagens;
