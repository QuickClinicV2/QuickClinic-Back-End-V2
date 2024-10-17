import AgendamentoViagens from '../models/agendamentoViagens.Model';

export const createAgendamentoViagemsService = async (dados: any) => {
    try {
        return await AgendamentoViagens.create(dados);
    } catch (error: unknown) {
        throw new Error(`Erro ao criar agendamento de viagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
};

export const getAllAgendamentosViagem = async () => {
    try {
        return await AgendamentoViagens.findAll();
    } catch (error: unknown) {
        throw new Error(`Erro ao listar agendamentos de viagem: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
};

export const getAgendamentoViagembyIdService = async (id: number) => {
    const agendamentoViagem = await AgendamentoViagens.findByPk(id);
    if (!agendamentoViagem) {
        throw new Error('Agendamento de viagem não encontrado');
    }
    return agendamentoViagem;
};

export const updateAgendamentoViagemService = async (id: number, dados: any) => {
    const agendamentoViagem = await AgendamentoViagens.findByPk(id);
    if (!agendamentoViagem) {
        throw new Error('Agendamento de viagem não encontrado');
    }
    return await agendamentoViagem.update(dados);
};

export const deleteAgendamentoViagemService = async (id: number) => {
    const agendamentoViagem = await AgendamentoViagens.findByPk(id);
    if (!agendamentoViagem) {
        throw new Error('Agendamento de viagem não encontrado');
    }
    await agendamentoViagem.destroy();
    return 'Agendamento de viagem removido com sucesso';
};
