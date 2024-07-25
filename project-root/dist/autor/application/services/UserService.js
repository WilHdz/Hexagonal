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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// src/autor/application/services/UserService.ts
const data_source_1 = require("../../../database/data-source");
const User_1 = require("../../application/domain/entities/User");
const bcrypt_1 = __importDefault(require("bcrypt")); // Asegúrate de instalar bcrypt
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Asegúrate de instalar jsonwebtoken
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneBy({ username });
        });
    }
    createUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.findUserByUsername(username);
            if (existingUser) {
                throw new Error('Username already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = this.userRepository.create({ username, password: hashedPassword });
            return this.userRepository.save(user);
        });
    }
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findUserByUsername(username);
            if (!user) {
                throw new Error('User not found');
            }
            yield this.userRepository.remove(user);
        });
    }
    verifyPassword(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(password, user.password);
        });
    }
    generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
    }
    verifyToken(token) {
        return jsonwebtoken_1.default.verify(token, 'your_jwt_secret');
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
}
exports.UserService = UserService;
