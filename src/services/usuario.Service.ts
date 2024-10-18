import User from "../models/usuario.Model"; 

export const getAllUsuariosService = async () => {
  try {
    const usuarios = await User.findAll();
    return usuarios;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para pegar um usuário pelo ID
export const getUsuarioByIdService = async (id: string) => {
  try {
    const usuario = await User.findByPk(id);
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para criar um usuário
export const createUsuarioService = async (data: { nome: string; email: string; cpf: string; numeroSus: string; dataNascimento: Date; password: string; }) => {
  try {
    const usuario = await User.create(data);
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para atualizar um usuário
export const updateUsuarioService = async (id: string, data: { nome?: string; email?: string; cpf?: string; numeroSus?: string; dataNascimento?: Date; password?: string; }) => {
  try {
    const [affectedRows] = await User.update(data, { where: { id } });
    if (affectedRows === 0) return null; // Nenhum usuário encontrado para atualizar
    return await User.findByPk(id); // Retorna o usuário atualizado
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para deletar um usuário
export const deleteUsuarioService = async (id: string) => {
  try {
    const deletedRows = await User.destroy({ where: { id } });
    if (deletedRows === 0) return null; // Nenhum usuário encontrado para deletar
    return deletedRows;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};