"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../autor/application/domain/entities/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'mauricio',
    password: 'Rock371dnd33',
    database: 'hexagonalPlan',
    entities: [User_1.User],
    synchronize: false,
});
