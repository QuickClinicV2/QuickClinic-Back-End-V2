import { Request, Response } from "express";
import { createUsuarioService, getAllUsuariosService, updateUsuarioService, deleteUsuarioService, getUsuarioByIdService } from "../services/usuario.service";
import { validationResult } from "express-validator";


interface CreateUserRequestBody {
  name: string;
  email: string;
  cpf: string;
  password: string;
}


// Cria um novo usuário
export const createUserController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const body = req.body as unknown;
  if (!isValidCreateUserBody(body)) {
    res.status(400).json({ message: "Estrutura do corpo da requisição inválida." });
    return;
  }

  const { name, email, cpf, password } = body;

  try {
    const usuario = await createUsuarioService({ name, email, cpf, password });
    res.status(201).json({ message: "Usuário criado com sucesso", data: usuario });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao criar usuário: ${errorMessage}` });
  }
};

// Pega todos os usuários
export const getAllUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await getAllUsuariosService();
    res.status(200).json({ data: usuarios });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(500).json({ message: `Erro ao buscar usuários: ${errorMessage}` });
  }
};

export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params; // Pega o ID dos parâmetros da rota

  try {
    const usuario = await getUsuarioByIdService(id); // Chama o serviço para buscar o usuário pelo ID
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

// Atualiza um usuário
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, cpf, password } = req.body;

  try {
    const updatedUser = await updateUsuarioService(id, { name, email, cpf, password });
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

// Deleta um usuário
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

// Função para validar corpo de criação de usuário
function isValidCreateUserBody(body: any): body is CreateUserRequestBody {
  return (
    typeof body === "object" &&
    body !== null &&
    typeof body.name === "string" &&
    typeof body.email === "string" &&
    typeof body.cpf === "string" &&
    typeof body.password === "string"
  );
}
