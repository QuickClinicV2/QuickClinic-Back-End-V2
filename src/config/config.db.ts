import dotenv from 'dotenv';

dotenv.config();

export default {
  url: process.env.DATABASE_URL, // Usa a string de conexão do .env
  dialect: 'postgres',
  define: {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  },
};