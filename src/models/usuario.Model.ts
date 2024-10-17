import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the User model
class Usuario extends Model {
    public id!: number;
    public nome!: string; // Campo alterado para "nome"
    public email!: string;
    public cpf!: string;
    public numeroSus!: string; // Campo "Número do SUS" em português
    public dataNascimento!: Date; // Campo "Data de Nascimento" em português
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Function to initialize the User model
export const initUsuarioModel = (sequelize: Sequelize) => {
    Usuario.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            cpf: {
                type: DataTypes.STRING(14),
                allowNull: false,
                unique: true,
            },
            numeroSus: {
                type: DataTypes.STRING(18),
                allowNull: false,
                unique: true,
            },
            dataNascimento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            password: {
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
        },
        {
            sequelize,
            tableName: 'usuarios',
            timestamps: true,
        }
    );
};

export default Usuario;
