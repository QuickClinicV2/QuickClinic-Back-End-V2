import { Router } from 'express';
import { createEspecializacaoController, getAllEspecializacoesController } from '../controllers/especializacao.Controller';

const router = Router();

router.post('/especializacao', createEspecializacaoController); // Criar especialização
router.get('/especializacoes', getAllEspecializacoesController); // Buscar todas as especializações

export default router;
