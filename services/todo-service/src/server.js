import express from 'express';
import cors from 'cors';
import { buildContainer } from './container.js';
import { createTodoRouter } from './interfaces/http/todoRoutes.js';
import { errorHandler } from './interfaces/http/errorHandler.js';

// Point d'entrée du microservice "todo".
const PORT = process.env.PORT || 4001;
const { todoController } = buildContainer();

const app = express();
app.use(cors());
app.use(express.json());

// Sonde de santé (utile pour Docker / l'orchestrateur).
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'todo-service' }));

app.use('/todos', createTodoRouter(todoController));
app.use(errorHandler);

app.listen(PORT, () => console.log(`todo-service démarré sur le port ${PORT}`));
