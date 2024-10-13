import prismaClient from "../prisma/config.db";

// Serviço para buscar todos os usuários
export const getAllUsuariosService = async () => {
  try {
    const usuarios = await prismaClient.user.findMany();
    return usuarios;
  } catch (error) {
    throw new Error(`Erro ao buscar usuários: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para pegar um usuário pelo id
export const getUsuarioByIdService = async (id: string) => {
  try {
    const usuario = await prismaClient.user.findUnique({
      where: { id },
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao buscar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};


// Serviço para Cria um usuário
export const createUsuarioService = async (data: { name: string; email: string; cpf: string; password: string; }) => {
  try {
    const usuario = await prismaClient.user.create({ data });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao criar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};


// Serviço para Atualiza um usuário
export const updateUsuarioService = async (id: string, data: { name?: string; email?: string; cpf?: string; password?: string; }) => {
  try {
    const usuario = await prismaClient.user.update({
      where: { id },
      data
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para Deleta um usuário
export const deleteUsuarioService = async (id: string) => {
  try {
    const usuario = await prismaClient.user.delete({
      where: { id },
    });
    return usuario;
  } catch (error) {
    throw new Error(`Erro ao deletar usuário: ${error instanceof Error ? error.message : String(error)}`);
  }
};
