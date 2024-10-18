import Ubs from "../models/ubs.Model";

// Serviço para buscar todas as UBSs
export const getAllUbsService = async () => {
  try {
    const ubsList = await Ubs.findAll();
    return ubsList;
  } catch (error) {
    throw new Error(`Erro ao buscar UBSs: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para pegar uma UBS pelo id
export const getUbsByIdService = async (id: string) => {
  try {
    const ubs = await Ubs.findByPk(id);
    return ubs;
  } catch (error) {
    throw new Error(`Erro ao buscar UBS: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para criar uma UBS
export const createUbsService = async (data: { nome: string; localizacao: string; codigo: string; responsavelTecnico: string; }) => {
  try {
    const ubs = await Ubs.create(data);
    return ubs;
  } catch (error) {
    throw new Error(`Erro ao criar UBS: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para atualizar uma UBS
export const updateUbsService = async (id: string, data: { nome?: string; localizacao?: string; codigo?: string; responsavelTecnico?: string; }) => {
  try {
    const ubs = await Ubs.update(data, {
      where: { id }
    });
    return ubs;
  } catch (error) {
    throw new Error(`Erro ao atualizar UBS: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para deletar uma UBS
export const deleteUbsService = async (id: string) => {
  try {
    const ubs = await Ubs.destroy({
      where: { id },
    });
    return ubs;
  } catch (error) {
    throw new Error(`Erro ao deletar UBS: ${error instanceof Error ? error.message : String(error)}`);
  }
};
