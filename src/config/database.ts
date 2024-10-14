import { Sequelize } from 'sequelize';
import databaseConfig from './config.db';
import { initUserModel } from '../models/User.Model'; // Import your User model

class Database {
    public connection!: Sequelize;

    constructor() {
        this.init();
    }

    init(): void {
        if (!databaseConfig.url) {
            throw new Error('Missing DATABASE_URL in environment variables');
        }

        this.connection = new Sequelize(databaseConfig.url, {
            dialect: 'postgres', // Define the dialect explicitly
        });

        // Initialize models
        initUserModel(this.connection);
    }
}

const database = new Database();
export default database;
