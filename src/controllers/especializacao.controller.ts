import { Request, Response } from 'express';
import { createEspecializacaoService, getAllEspecializacoesService } from '../services/especializacao.Service';

// Controlador para criar uma nova especialização
export const createEspecializacaoController = async (req: Request, res: Response): Promise<void> => {
  try {
    const especializacao = await createEspecializacaoService(req.body);
    res.status(201).json({ message: 'Especialização criada com sucesso', data: especializacao });
  } catch (error) {
    res.status(500).json({ message: `Erro ao criar especialização: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para buscar todas as especializações
export const getAllEspecializacoesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const especializacoes = await getAllEspecializacoesService();
    res.status(200).json({ data: especializacoes });
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar especializações: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};
