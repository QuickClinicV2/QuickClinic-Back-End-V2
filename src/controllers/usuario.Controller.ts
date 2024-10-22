import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUsuarioService,
  getAllUsuariosService,
  findUsuarioByEmailService,
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
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
  role: string; // Papel do usuário
  orgId: string; // UUID da organização
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

  const { nome, email, cpf, numeroSus, dataNascimento, telefone, rua, numero, bairro, cidade, estado, senha, role, orgId } = body;

  try {
    // Convertendo dataNascimento para Date
    const usuario = await createUsuarioService({
      nome,
      email,
      cpf,
      numeroSus,
      dataNascimento: new Date(dataNascimento),
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      senha,
      role,
      orgId,
    });
    res.status(201).json({ message: "Usuário criado com sucesso", data: usuario });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    res.status(400).json({ message: `Erro ao criar usuário: ${errorMessage}` });
  }
};

// Controlador para login de usuário
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, senha } = req.body;

  try {
    const usuario = await findUsuarioByEmailService(email);
    if (!usuario) {
      res.status(400).json({ message: "Usuário não encontrado." });
      return;
    }

    // Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Senha inválida." });
      return;
    }

    // Gera um token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET || "secrettoken", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    res.status(500).json({ message: `Erro ao fazer login: ${error instanceof Error ? error.message : "Erro desconhecido"}` });
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
    // Certifique-se de que o id é um UUID válido
    if (!isValidUUID(id)) {
      res.status(400).json({ message: "ID inválido." });
      return;
    }

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

// Função para validar UUID
const isValidUUID = (uuid: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Controlador para atualizar um usuário
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nome, email, cpf, numeroSus, dataNascimento, telefone, rua, numero, bairro, cidade, estado, senha } = req.body;

  try {
    const updatedUser = await updateUsuarioService(id, {
      nome,
      email,
      cpf,
      numeroSus,
      dataNascimento: new Date(dataNascimento), // Convertendo data para Date
      telefone,
      rua,
      numero,
      bairro,
      cidade,
      estado,
      senha
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
    typeof body.telefone === "string" &&
    typeof body.rua === "string" &&
    typeof body.numero === "string" &&
    typeof body.bairro === "string" &&
    typeof body.cidade === "string" &&
    typeof body.estado === "string" &&
    typeof body.senha === "string" &&
    typeof body.role === "string" &&
    typeof body.orgId === "string" &&
    !isNaN(Date.parse(body.dataNascimento)) // Valida se a string pode ser convertida para uma data válida
  );
}
