import { DataSource } from 'typeorm';
import { User } from '../autor/application/domain/entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'mauricio',
  password: 'Rock371dnd33',
  database: 'hexagonalPlan',
  entities: [User],
  synchronize: false,
});
