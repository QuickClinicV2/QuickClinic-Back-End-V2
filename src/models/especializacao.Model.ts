import { Sequelize, Model, DataTypes } from 'sequelize';
import initMedicoModel from './medico.Model'; // Importa a função de inicialização do modelo Medico
import { v4 as uuidv4 } from 'uuid';

export const initEspecializacaoModel = (sequelize: Sequelize) => {
    class Especializacao extends Model {
        public id!: number;
        public nome!: string;
    }

    Especializacao.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true,
          },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'especializacao',
    });

    // Inicializa o modelo Medico e obtém a classe
    const Medico = initMedicoModel(sequelize); 

    // Associa a Especializacao ao Medico
    Especializacao.belongsToMany(Medico, { through: 'medicoEspecializacoes' });
    
    return Especializacao; // Retorna a classe Especializacao
};

export default initEspecializacaoModel; // Exporta a função de inicialização
