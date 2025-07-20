import { Sequelize } from 'sequelize';
import * as config from './config.json';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env as keyof typeof config];

if (!dbConfig.database || !dbConfig.username || !dbConfig.password) {
  throw new Error('Database configuration is invalid. Please check your config file.');
}

const sequelize = new Sequelize(dbConfig.database as string, dbConfig.username as string, dbConfig.password as string, {
  host: dbConfig.host,
  dialect: dbConfig.dialect as any,
});

export default sequelize;
