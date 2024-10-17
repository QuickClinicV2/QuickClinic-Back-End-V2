import { Request, Response } from "express";
import {
  createUbsService,
  getAllUbsService,
  updateUbsService,
  deleteUbsService,
  getUbsByIdService
} from "../services/ubs.Service";
import { validationResult } from "express-validator";

// Interface para a criação de UBS
interface CreateUbsRequestBody {
  nome: string;
  localizacao: string;
  codigo: string;
  responsavelTecnico: string;
}

// Controlador para criar uma nova UBS
export const createUbsController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const body = req.body as CreateUbsRequestBody;

  try {
    const ubs = await createUbsService(body);
    res.status(201).json({ message: "UBS criada com sucesso", data: ubs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao criar UBS: ${errorMessage}` });
  }
};

// Controlador para pegar todas as UBSs
export const getAllUbsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const ubsList = await getAllUbsService();
    res.status(200).json({ data: ubsList });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao buscar UBSs: ${errorMessage}` });
  }
};

// Controlador para pegar uma UBS pelo ID
export const getUbsByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const ubs = await getUbsByIdService(id);
    if (!ubs) {
      res.status(404).json({ message: "UBS não encontrada." });
      return;
    }
    res.status(200).json({ data: ubs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao buscar UBS: ${errorMessage}` });
  }
};

// Controlador para atualizar uma UBS
export const updateUbsController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, localizacao, codigo, responsavelTecnico } = req.body;

  try {
    const updatedUbs = await updateUbsService(id, { nome, localizacao, codigo, responsavelTecnico });
    if (!updatedUbs) {
      res.status(404).json({ message: "UBS não encontrada." });
      return;
    }
    res.status(200).json({ message: "UBS atualizada com sucesso", data: updatedUbs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao atualizar UBS: ${errorMessage}` });
  }
};

// Controlador para deletar uma UBS
export const deleteUbsController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUbs = await deleteUbsService(id);
    if (!deletedUbs) {
      res.status(404).json({ message: "UBS não encontrada." });
      return;
    }
    res.status(200).json({ message: "UBS deletada com sucesso" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao deletar UBS: ${errorMessage}` });
  }
};
