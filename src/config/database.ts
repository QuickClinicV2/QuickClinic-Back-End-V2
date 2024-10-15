import { Sequelize } from 'sequelize';
import databaseConfig from './config.db';
import { initUserModel } from '../models/User.Model'; // Import your User model
import { initUbsModel } from '../models/ubs.Model'; // Import your UBS model
import { initMedicoModel } from '../models/medico.Model'; // Importa a função de inicialização
import { initEspecializacaoModel } from '../models/especializacao.Model'; // Importa a função de inicialização

class Database {
    public connection!: Sequelize;
    public Medico: any; // Adicione uma propriedade para Medico
    public Especializacao: any; // Adicione uma propriedade para Especializacao

    constructor() {
        this.init();
    }

    init(): void {
        if (!databaseConfig.url) {
            throw new Error('Missing DATABASE_URL in environment variables');
        }

        this.connection = new Sequelize(databaseConfig.url, {
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
        });

        // Inicializar os modelos e armazenar as instâncias
        initUserModel(this.connection);
        initUbsModel(this.connection);
        this.Medico = initMedicoModel(this.connection); // Armazena a instância do modelo Medico
        this.Especializacao = initEspecializacaoModel(this.connection); // Armazena a instância do modelo Especializacao

        // Sincronizar automaticamente com o banco de dados
        this.connection.sync({ alter: true })
            .then(() => {
                console.log('Tabelas sincronizadas com sucesso.');
            })
            .catch((error) => {
                console.error('Erro ao sincronizar tabelas:', error);
            });
    }
}

const database = new Database();
export default database;
