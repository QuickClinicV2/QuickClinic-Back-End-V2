import User from "../models/usuario.Model";
import bcrypt from 'bcrypt';

export const createUsuarioService = async (data: {
  nome: string;
  email: string;
  cpf: string;
  numeroSus: string;
  dataNascimento: Date;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
  role: string; 
  orgId: string; 
}) => {
  try {
    // Hasheando a senha antes de salvar
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    const usuario = await User.create({ ...data, senha: hashedPassword });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para buscar todos os usuários
export const getAllUsuariosService = async () => {
  try {
    const usuarios = await User.findAll();
    return usuarios;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para encontrar um usuário pelo email
export const findUsuarioByEmailService = async (email: string) => {
  return await User.findOne({ where: { email } });
};


// Serviço para atualizar um usuário
export const updateUsuarioService = async (id: string, data: Partial<any>) => {
  await User.update(data, { where: { id } });
  return await User.findOne({ where: { id } });
};

// Serviço para deletar um usuário
export const deleteUsuarioService = async (id: string) => {
  const usuario = await User.findOne({ where: { id } });
  if (usuario) {
    await usuario.destroy();
    return true;
  }
  return false;
};

// Serviço para buscar um usuário por ID
export const getUsuarioByIdService = async (id: string) => {
  try {
    const usuario = await User.findByPk(id);
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};