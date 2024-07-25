import 'reflect-metadata';
import express from 'express';
import cors from 'cors'; // Importa el middleware de CORS
import { AppDataSource } from './database/data-source';
import { UserController } from './autor/infrastructure/controllers/UserController';

const app = express();
const port = 3000;
const userController = new UserController();

app.use(cors()); // Utiliza el middleware de CORS
app.use(express.json());

// Rutas
app.post('/register', (req, res) => userController.createUser(req, res)); // Ruta para registrar un usuario
app.post('/login', (req, res) => userController.login(req, res));       // Ruta para iniciar sesión

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database!');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log('Database connection error:', error));
