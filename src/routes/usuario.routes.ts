import { Router } from "express";
import { check } from "express-validator";
import { createUserController, getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from "../controllers/usuario.Controller";

const router = Router();

// Rota para criar um novo usuário
router.post(
  "/usuario",
  [
    check("name").notEmpty().withMessage("O nome é obrigatório"),
    check("email").isEmail().withMessage("O email deve ser válido"),
    check("cpf").notEmpty().withMessage("O CPF é obrigatório"),
    check("password").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
  ],
  createUserController
);

// Rota para pegar todos os usuários
router.get("/usuarios", getAllUsersController);

// Rota para pegar um usuário por ID
router.get("/usuario/:id", getUserByIdController);

// Rota para atualizar um usuário
router.put(
  "/usuario/:id",
  [
    check("name").optional().notEmpty().withMessage("O nome é obrigatório se fornecido"),
    check("email").optional().isEmail().withMessage("O email deve ser válido se fornecido"),
    check("cpf").optional().notEmpty().withMessage("O CPF é obrigatório se fornecido"),
    check("password").optional().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres se fornecida"),
  ],
  updateUserController
);

// Rota para deletar um usuário
router.delete("/usuario/:id", deleteUserController);

export default router;
