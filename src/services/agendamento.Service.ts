import Agendamento from '../models/agendamento.Model';

export const getAllAgendamentosService = async () => {
    try {
        return await Agendamento.findAll();
    } catch (error: unknown) {
        throw new Error(`Erro ao listar agendamentos: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
};

export const getAgendamentoByIdService = async (id: number) => {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
        throw new Error('Agendamento não encontrado');
    }
    return agendamento;
};

export const createAgendamentosService = async (dados: any) => {
    try {
        return await Agendamento.create(dados);
    } catch (error: unknown) {
        throw new Error(`Erro ao criar agendamento: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
};

export const updateAgendamentoService = async (id: number, dados: any) => {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
        throw new Error('Agendamento não encontrado');
    }
    return await agendamento.update(dados);
};

export const deleteAgendamentoService = async (id: number) => {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
        throw new Error('Agendamento não encontrado');
    }
    await agendamento.destroy();
    return 'Agendamento removido com sucesso';
};
