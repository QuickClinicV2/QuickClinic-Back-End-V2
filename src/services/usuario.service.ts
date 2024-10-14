import User from "../models/User.Model"; 

// Serviço para buscar todos os usuários
export const getAllUsuariosService = async () => {
  try {
    const usuarios = await User.findAll(); // Sequelize usa findAll para buscar todos os registros
    return usuarios;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para pegar um usuário pelo id
export const getUsuarioByIdService = async (id: string) => {
  try {
    const usuario = await User.findByPk(id); // findByPk para buscar pelo ID primário
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para criar um usuário
export const createUsuarioService = async (data: { name: string; email: string; cpf: string; password: string; }) => {
  try {
    const usuario = await User.create(data); // create para inserir novo registro
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para atualizar um usuário
export const updateUsuarioService = async (id: string, data: { name?: string; email?: string; cpf?: string; password?: string; }) => {
  try {
    const usuario = await User.update(data, { // update para atualizar registros
      where: { id }
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para deletar um usuário
export const deleteUsuarioService = async (id: string) => {
  try {
    const usuario = await User.destroy({ // destroy para deletar registros
      where: { id },
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};
