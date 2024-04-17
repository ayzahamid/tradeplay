// database.ts

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('test_db', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});
