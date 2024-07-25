"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importa el middleware de CORS
const data_source_1 = require("./database/data-source");
const UserController_1 = require("./autor/infrastructure/controllers/UserController");
const app = (0, express_1.default)();
const port = 3000;
const userController = new UserController_1.UserController();
app.use((0, cors_1.default)()); // Utiliza el middleware de CORS
app.use(express_1.default.json());
// Rutas
app.post('/register', (req, res) => userController.createUser(req, res)); // Ruta para registrar un usuario
app.post('/login', (req, res) => userController.login(req, res)); // Ruta para iniciar sesión
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Connected to the database!');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch((error) => console.log('Database connection error:', error));
