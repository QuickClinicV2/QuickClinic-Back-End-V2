import { Router } from 'express';
import { 
    createAgendamentoController, 
    getAllAgendamentosController, 
    getAgendamentosByIdController, 
    updateAgendamentosController, 
    deleteAgendamentosController 
} from '../controllers/agendamento.Controller';

const router = Router();

router.post('/agendamento', createAgendamentoController);
router.get('/agendamentos', getAllAgendamentosController);
router.get('/agendamento/:id', getAgendamentosByIdController);
router.put('/agendamento/:id', updateAgendamentosController);
router.delete('/agendamento/:id', deleteAgendamentosController);

export default router;
