import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import database from './config/database'; // Import database connection
import usuarioRoutes from "./routes/usuario.routes";
import ubsRoutes from "./routes/ubs.routes";
import medicoRoutes from './routes/medico.routes';
import especializacaoRoutes from "./routes/especializacao.routes"

dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use("/api", usuarioRoutes);
app.use("/api", ubsRoutes);
app.use("/api", medicoRoutes);
app.use("/api", especializacaoRoutes)


// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // Ensure the database connection is established
    database.connection.authenticate()
        .then(() => {
            console.log('Database connection established successfully.');
        })
        .catch((error: Error) => {
            console.error('Unable to connect to the database:', error);
        });
});

/*database.connection.sync({ force: false }) // Set force: true to drop existing tables and recreate them
    .then(() => {
        console.log('Database & tables created!');
});*/