import database from '../config/database'; // Ajuste o caminho para o seu arquivo de banco de dados

// Serviço para criar um novo médico
export const createMedicoService = async (data: { nome: string; cpf: string; crm: string; email: string; telefoneContato: string; especializacoes?: number[] }) => {
  try {
    const medico = await database.Medico.create(data); // Usa a instância do modelo

    // Vincular especializações ao médico
    if (data.especializacoes && data.especializacoes.length > 0) {
      const especializacoes = await database.Especializacao.findAll({ where: { id: data.especializacoes } }); // Usa a instância do modelo
      await medico.addEspecializacoes(especializacoes);
    }

    return medico;
  } catch (error) {
    throw new Error(`Erro ao criar médico: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para buscar todos os médicos
export const getAllMedicosService = async () => {
  try {
    const medicos = await database.Medico.findAll({ include: database.Especializacao }); // Usa a instância do modelo
    return medicos;
  } catch (error) {
    throw new Error(`Erro ao buscar médicos: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para associar especializações a um médico
export const associateEspecializacaoService = async (medicoId: number, especializacaoId: number) => {
  try {
    const medico = await database.Medico.findByPk(medicoId); // Usa a instância do modelo
    const especializacao = await database.Especializacao.findByPk(especializacaoId); // Usa a instância do modelo
    
    if (medico && especializacao) {
      await medico.addEspecializacao(especializacao);
      return medico;
    }

    throw new Error('Médico ou Especialização não encontrados');
  } catch (error) {
    throw new Error(`Erro ao associar especialização: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para buscar um médico pelo ID
export const getMedicoByIdService = async (id: string) => {
  try {
    const medico = await database.Medico.findByPk(id, { include: database.Especializacao }); // Usa a instância do modelo
    return medico;
  } catch (error) {
    throw new Error(`Erro ao buscar médico: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para atualizar um médico
export const updateMedicoService = async (id: string, data: { nome?: string; cpf?: string; crm?: string; email?: string; telefoneContato?: string }) => {
  try {
    const medico = await database.Medico.update(data, { where: { id }, returning: true }); // Usa a instância do modelo
    return medico[1][0]; // Retorna o médico atualizado
  } catch (error) {
    throw new Error(`Erro ao atualizar médico: ${error instanceof Error ? error.message : String(error)}`);
  }
};

// Serviço para deletar um médico
export const deleteMedicoService = async (id: string) => {
  try {
    const rowsDeleted = await database.Medico.destroy({ where: { id } }); // Usa a instância do modelo
    if (rowsDeleted) {
      return { message: 'Médico deletado com sucesso' };
    } else {
      throw new Error('Médico não encontrado');
    }
  } catch (error) {
    throw new Error(`Erro ao deletar médico: ${error instanceof Error ? error.message : String(error)}`);
  }
};
