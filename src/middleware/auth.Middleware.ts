import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided.' });
    return; // Retorna para evitar continuar a execução
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload; 
    req.usuario = decoded; // Atribuindo o token decodificado à propriedade usuario
    next(); // Chama o próximo middleware
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
    return; // Retorna para evitar continuar a execução
  }
};

export default authMiddleware;
