"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../../application/services/UserService");
class UserController {
    constructor() {
        this.userService = new UserService_1.UserService();
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                // Verifica si el nombre de usuario ya existe
                const existingUser = yield this.userService.findUserByUsername(username);
                if (existingUser) {
                    return res.status(400).json({ message: 'Username already exists' });
                }
                // Crea un nuevo usuario
                const user = yield this.userService.createUser(username, password);
                res.status(201).json({ message: 'User created successfully' });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            try {
                const user = yield this.userService.findUserByUsername(username);
                if (user && (yield this.userService.verifyPassword(user, password))) {
                    const token = this.userService.generateToken(user);
                    res.status(200).json({ message: 'Login successful', token });
                }
                else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UserController = UserController;
