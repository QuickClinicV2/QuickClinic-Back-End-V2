import { Request, Response } from "express";
import {
  createUsuarioService,
  getAllUsuariosService,
  updateUsuarioService,
  deleteUsuarioService,
  getUsuarioByIdService
} from "../services/usuario.Service";
import { validationResult } from "express-validator";

// Interface para o corpo da requisição de criação de usuário
interface CreateUserRequestBody {
  nome: string;
  email: string;
  cpf: string;
  numeroSus: string;
  dataNascimento: string; // Alterado para string (data geralmente vem como string via HTTP)
  password: string;
}

// Controlador para criar um novo usuário
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const body = req.body as CreateUserRequestBody;

  if (!isValidCreateUserBody(body)) {
    res.status(400).json({ message: "Estrutura do corpo da requisição inválida." });
    return;
  }

  const { nome, email, cpf, numeroSus, dataNascimento, password } = body;

  try {
    // Convertendo dataNascimento para Date
    const usuario = await createUsuarioService({
      nome,
      email,
      cpf,
      numeroSus,
      dataNascimento: new Date(dataNascimento),
      password
    });
    res.status(201).json({ message: "Usuário criado com sucesso", data: usuario });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao criar usuário: ${errorMessage}` });
  }
};

// Controlador para buscar todos os usuários
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await getAllUsuariosService();
    res.status(200).json({ data: usuarios });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao buscar usuários: ${errorMessage}` });
  }
};

// Controlador para buscar um usuário por ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const usuario = await getUsuarioByIdService(id);
    if (!usuario) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json({ data: usuario });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao buscar usuário: ${errorMessage}` });
  }
};

// Controlador para atualizar um usuário
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, email, cpf, numeroSus, dataNascimento, password } = req.body;

  try {
    const updatedUser = await updateUsuarioService(id, {
      nome,
      email,
      cpf,
      numeroSus,
      dataNascimento: new Date(dataNascimento), // Convertendo data para Date
      password
    });
    if (!updatedUser) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso", data: updatedUser });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao atualizar usuário: ${errorMessage}` });
  }
};

// Controlador para deletar um usuário
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUsuarioService(id);
    if (!deletedUser) {
      res.status(404).json({ message: "Usuário não encontrado." });
      return;
    }
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao deletar usuário: ${errorMessage}` });
  }
};

// Validação do corpo da requisição
function isValidCreateUserBody(body: any): body is CreateUserRequestBody {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof body.nome === "string" &&
    typeof body.email === "string" &&
    typeof body.cpf === "string" &&
    typeof body.numeroSus === "string" &&
    !isNaN(Date.parse(body.dataNascimento)) && // Valida se a string pode ser convertida para uma data válida
    typeof body.password === "string"
  );
}