import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the UBS model
class Ubs extends Model {
    public id!: number;
    public nome!: string;
    public localizacao!: string;
    public codigo!: string;
    public responsavelTecnico!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Function to initialize the UBS model
export const initUbsModel = (sequelize: Sequelize) => {
    Ubs.init(
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
            localizacao: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            codigo: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            responsavelTecnico: {
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
            tableName: 'ubs',
            timestamps: true,
        }
    );
};

export default Ubs;
