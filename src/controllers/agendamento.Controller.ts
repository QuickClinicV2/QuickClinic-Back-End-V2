import { Request, Response } from 'express';
import { 
    getAllAgendamentosService, 
    getAgendamentoByIdService, 
    createAgendamentosService, 
    updateAgendamentoService, 
    deleteAgendamentoService 
} from '../services/agendamento.Service';

export const createAgendamentoController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamento = await createAgendamentosService(req.body);
        res.status(201).json(agendamento);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao criar agendamento' });
    }
};

export const getAllAgendamentosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamentos = await getAllAgendamentosService();
        res.status(200).json(agendamentos);
    } catch (error: unknown) {
        res.status(500).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao listar agendamentos' });
    }
};

export const getAgendamentosByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamento = await getAgendamentoByIdService(parseInt(req.params.id));
        res.status(200).json(agendamento);
    } catch (error: unknown) {
        res.status(404).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao obter agendamento' });
    }
};

export const updateAgendamentosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamento = await updateAgendamentoService(parseInt(req.params.id), req.body);
        res.status(200).json(agendamento);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar agendamento' });
    }
};

export const deleteAgendamentosController = async (req: Request, res: Response): Promise<void> => {
    try {
        const mensagem = await deleteAgendamentoService(parseInt(req.params.id));
        res.status(200).json({ mensagem });
    } catch (error: unknown) {
        res.status(404).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao remover agendamento' });
    }
};
