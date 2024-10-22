import { JwtPayload } from 'jsonwebtoken';

declare module "express";

declare module 'express-serve-static-core' {
    interface Request {
      usuario?: string | JwtPayload; // Defina o tipo da propriedade 'usuario'
    }
}