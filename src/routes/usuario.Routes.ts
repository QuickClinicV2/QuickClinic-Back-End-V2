import { Router } from "express";
import { check } from "express-validator";
import authMiddleware from "../middleware/auth.Middleware"; 
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  loginUserController
} from "../controllers/usuario.Controller";

const router = Router();

// Rota para registro de um novo usuário
router.post(
  "/register",
  [
    check("nome").notEmpty().withMessage("O nome é obrigatório"),
    check("email").isEmail().withMessage("O email deve ser válido"),
    check("cpf").notEmpty().withMessage("O CPF é obrigatório"),
    check("senha").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
  ],
  createUserController
);

// Rota para login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("O email deve ser válido"),
    check("senha").notEmpty().withMessage("A senha é obrigatória"),
  ],
  loginUserController
);

// Rota protegida como exemplo
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "Esta é uma rota protegida!" });
});

// Outras rotas...
router.get("/usuarios", getAllUsersController);
router.get("/usuario/:id",  getUserByIdController);
router.put(
  "/usuario/:id",
  [
    check("nome").optional().notEmpty().withMessage("O nome é obrigatório se fornecido"),
    check("email").optional().isEmail().withMessage("O email deve ser válido se fornecido"),
    check("cpf").optional().notEmpty().withMessage("O CPF é obrigatório se fornecido"),
    check("senha").optional().isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres se fornecida"),
  ],
  updateUserController
);
router.delete("/usuario/:id", authMiddleware, deleteUserController);

export default router;
