import { Router } from "express";
import { check } from "express-validator";
import { createUbsController, getAllUbsController, getUbsByIdController, updateUbsController, deleteUbsController } from "../controllers/ubs.Controller";

const router = Router();

// Rota para criar uma nova UBS
router.post(
  "/ubs",
  [
    check("nome").notEmpty().withMessage("O nome é obrigatório"),
    check("localizacao").notEmpty().withMessage("A localização é obrigatória"),
    check("codigo").notEmpty().withMessage("O código é obrigatório"),
    check("responsavelTecnico").notEmpty().withMessage("O responsável técnico é obrigatório"),
  ],
  createUbsController
);

// Rota para pegar todas as UBSs
router.get("/ubss", getAllUbsController);

// Rota para pegar uma UBS por ID
router.get("/ubs/:id", getUbsByIdController);

// Rota para atualizar uma UBS
router.put(
  "/ubs/:id",
  [
    check("nome").optional().notEmpty().withMessage("O nome é obrigatório se fornecido"),
    check("localizacao").optional().notEmpty().withMessage("A localização é obrigatória se fornecida"),
    check("codigo").optional().notEmpty().withMessage("O código é obrigatório se fornecido"),
    check("responsavelTecnico").optional().notEmpty().withMessage("O responsável técnico é obrigatório se fornecido"),
  ],
  updateUbsController
);

// Rota para deletar uma UBS
router.delete("/ubs/:id", deleteUbsController);

export default router;
