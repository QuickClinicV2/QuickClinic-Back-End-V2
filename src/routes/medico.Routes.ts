import { Router } from 'express';
import { check } from 'express-validator';
import {
  createMedicoController,
  getAllMedicosController,
  getMedicoByIdController,
  updateMedicoController,
  associateEspecializacaoController,
  deleteMedicoController,
} from '../controllers/medico.Controller';

const router = Router();

// Rota para criar um novo médico
router.post(
  '/medico',
  [
    check('nome').notEmpty().withMessage('O nome é obrigatório'),
    check('cpf').isLength({ min: 11 }).withMessage('O CPF deve ter 11 caracteres'),
    check('crm').notEmpty().withMessage('O CRM é obrigatório'),
    check('email').isEmail().withMessage('O email deve ser válido'),
    check('telefoneContato').notEmpty().withMessage('O telefone de contato é obrigatório'),
  ],
  createMedicoController
);

// Rota para buscar todos os médicos
router.get('/medicos', getAllMedicosController);

// Rota para buscar um médico por ID
router.get('/medico/:id', getMedicoByIdController);

// Rota para atualizar um médico
router.put('/medico/:id', updateMedicoController);

 // Associar especialização a médico
router.post('/medico/especializacao', associateEspecializacaoController);

// Rota para deletar um médico
router.delete('/medico/:id', deleteMedicoController);

export default router;
