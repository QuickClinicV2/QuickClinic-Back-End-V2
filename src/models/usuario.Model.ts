import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

// Define the User model
class Usuario extends Model {
  public id!: string;
  public nome!: string;
  public email!: string; 
  public cpf!: string;
  public numeroSus!: string;
  public dataNascimento!: Date;
  public telefone!: string;
  public rua!: string;
  public numero!: string;
  public bairro!: string;
  public cidade!: string;
  public estado!: string;
  public senha!: string;
  public role!: string;
  public orgId!: string;

  public static async hashPassword(senha: string) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || '10', 10);
    return bcrypt.hash(senha, saltRounds);
  }

  public static async isValidPassword(senha: string, hash: string) {
    return bcrypt.compare(senha, hash);
  }
}

// Function to initialize the User model
export const initUsuarioModel = (sequelize: Sequelize) => {
    Usuario.init(
        {
            id: {
              type: DataTypes.UUID,
              defaultValue: uuidv4,
              primaryKey: true,
            },
            nome: { type: DataTypes.STRING(255), allowNull: false },
            email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
            cpf: { type: DataTypes.STRING(255), allowNull: false },
            numeroSus: { type: DataTypes.STRING(255), allowNull: false },
            dataNascimento: { type: DataTypes.DATE, allowNull: false },
            telefone: { type: DataTypes.STRING(255), allowNull: false },
            rua: { type: DataTypes.STRING(255), allowNull: false },
            numero: { type: DataTypes.STRING(255), allowNull: false },
            bairro: { type: DataTypes.STRING(255), allowNull: false },
            cidade: { type: DataTypes.STRING(255), allowNull: false },
            estado: { type: DataTypes.STRING(255), allowNull: false },
            senha: { type: DataTypes.STRING(255), allowNull: false },
            role: { type: DataTypes.ENUM('admin', 'tecnico', 'paciente'), defaultValue: 'paciente' },
            orgId: { type: DataTypes.UUID, allowNull: false },
          },
        {
            sequelize,
            tableName: 'usuarios',
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                  user.senha = await Usuario.hashPassword(user.senha);
                },
        },}
    );
};

export default Usuario;
