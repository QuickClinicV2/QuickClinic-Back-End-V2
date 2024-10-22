import { Request, Response } from 'express';
import { 
    createAgendamentoViagemsService, 
    getAllAgendamentosViagem, 
    getAgendamentoViagembyIdService, 
    updateAgendamentoViagemService, 
    deleteAgendamentoViagemService 
} from '../services/agendamentoViagens.Service';

export const createAgendamentoViagemController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamentoViagem = await createAgendamentoViagemsService(req.body);
        res.status(201).json(agendamentoViagem);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao criar agendamento' });
    }
};

export const getAllAgendamentosViagemController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamentosViagem = await getAllAgendamentosViagem();
        res.status(200).json(agendamentosViagem);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao listar agendamentos' });
    }
};

export const getAgendamentoViagemByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const agendamentoViagem = await getAgendamentoViagembyIdService(parseInt(req.params.id));
        res.status(200).json(agendamentoViagem);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao obter agendamento' });
    }
};

export const updateAgendamentoViagemController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Use diretamente req.params.id como UUID
        const agendamentoViagem = await updateAgendamentoViagemService(req.params.id, req.body);
        res.status(200).json(agendamentoViagem);
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao atualizar agendamento de viagem' });
    }
};

export const deleteAgendamentoViagemController = async (req: Request, res: Response): Promise<void> => {
    try {
        // Use diretamente req.params.id como UUID
        const mensagem = await deleteAgendamentoViagemService(req.params.id);
        res.status(200).json({ mensagem });
    } catch (error: unknown) {
        res.status(400).json({ erro: error instanceof Error ? error.message : 'Erro desconhecido ao remover agendamento de viagem' });
    }
};