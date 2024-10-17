import { Router } from 'express';
import { 
    createAgendamentoViagemController, 
    getAllAgendamentosViagemController, 
    getAgendamentoViagemByIdController, 
    updateAgendamentoViagemController, 
    deleteAgendamentoViagemController 
} from '../controllers/agendamentoViagens.Controller';

const router = Router();

router.post('/agendamento-viagens', createAgendamentoViagemController);
router.get('/agendamentos-viagens', getAllAgendamentosViagemController);
router.get('/agendamento-viagens/:id', getAgendamentoViagemByIdController);
router.put('/agendamento-viagens/:id', updateAgendamentoViagemController);
router.delete('/agendamento-viagens/:id', deleteAgendamentoViagemController);

export default router;
