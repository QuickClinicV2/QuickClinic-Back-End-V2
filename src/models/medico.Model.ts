import { Sequelize, Model, DataTypes } from 'sequelize';

export const initMedicoModel = (sequelize: Sequelize) => {
  class Medico extends Model {
    public id!: number;
    public nome!: string;
    public cpf!: string;
    public crm!: string;
    public email!: string;
    public telefoneContato!: string;
  }

  Medico.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    crm: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefoneContato: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'medico',
  });

  return Medico;
};

export default initMedicoModel;
