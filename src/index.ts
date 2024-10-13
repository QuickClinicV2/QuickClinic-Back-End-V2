import express from "express";
import usuarioRoutes from "./routes/usuario.routes";
import dotenv from "dotenv";
import cors from "cors"; // Para habilitar CORS
import morgan from "morgan"; // Logger HTTP

dotenv.config(); // Carrega variáveis de ambiente

const app = express();

// Middleware para habilitar CORS (opcional, mas recomendado se você vai expor a API publicamente)
app.use(cors());

// Logger HTTP
app.use(morgan('dev'));

// Init Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Use Rotas
app.use("/api", usuarioRoutes);

// Middleware para tratamento de erros (básico)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
