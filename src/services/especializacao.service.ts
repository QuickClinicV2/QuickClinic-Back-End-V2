import { initEspecializacaoModel } from '../models/especializacao.Model'; // Importa a função de inicialização
import database from '../config/database'; // Certifique-se de que o caminho está correto

// Inicialização do modelo Especializacao
const Especializacao = initEspecializacaoModel(database.connection); // Substitua null pelo modelo Medico, se necessário

// Serviço para criar uma nova especialização
export const createEspecializacaoService = async (data: { nome: string }) => {
    try {
        const especializacao = await Especializacao.create(data); // Usar o método create
        return especializacao;
    } catch (error) {
        throw new Error(`Erro ao criar especialização: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Serviço para buscar todas as especializações
export const getAllEspecializacoesService = async () => {
    try {
        const especializacoes = await Especializacao.findAll(); // Usar o método findAll
        return especializacoes;
    } catch (error) {
        throw new Error(`Erro ao buscar especializações: ${error instanceof Error ? error.message : String(error)}`);
    }
};
