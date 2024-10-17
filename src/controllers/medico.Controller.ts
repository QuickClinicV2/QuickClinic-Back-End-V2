import { Request, Response } from 'express';
import { 
  createMedicoService, 
  getAllMedicosService, 
  getMedicoByIdService, 
  updateMedicoService, 
  deleteMedicoService, 
  associateEspecializacaoService 
} from '../services/medico.Service';
import { validationResult } from 'express-validator';

// Controlador para criar um médico
export const createMedicoController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const medico = await createMedicoService(req.body);
    res.status(201).json({ message: 'Médico criado com sucesso', data: medico });
  } catch (error) {
    res.status(500).json({ message: `Erro ao criar médico: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para buscar todos os médicos
export const getAllMedicosController = async (req: Request, res: Response): Promise<void> => {
  try {
    const medicos = await getAllMedicosService();
    res.status(200).json({ data: medicos });
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar médicos: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para buscar um médico por ID
export const getMedicoByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const medico = await getMedicoByIdService(id);
    if (!medico) {
      res.status(404).json({ message: 'Médico não encontrado' });
      return;
    }
    res.status(200).json({ data: medico });
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar médico: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para atualizar um médico
export const updateMedicoController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const medico = await updateMedicoService(id, req.body);
    res.status(200).json({ message: 'Médico atualizado com sucesso', data: medico });
  } catch (error) {
    res.status(500).json({ message: `Erro ao atualizar médico: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para deletar um médico
export const deleteMedicoController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await deleteMedicoService(id);
    res.status(200).json({ message: 'Médico deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: `Erro ao deletar médico: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};

// Controlador para associar especializações a um médico
export const associateEspecializacaoController = async (req: Request, res: Response): Promise<void> => {
  const { medicoId, especializacaoId } = req.body;

  try {
    const medico = await associateEspecializacaoService(medicoId, especializacaoId);
    res.status(200).json({ message: 'Especialização associada com sucesso', data: medico });
  } catch (error) {
    res.status(500).json({ message: `Erro ao associar especialização: ${error instanceof Error ? error.message : 'Erro desconhecido'}` });
  }
};
