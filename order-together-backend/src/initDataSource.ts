import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import dotenv from 'dotenv-flow';

dotenv.config();

const dbPort = process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306;
const synchronize = process.env.MYSQL_SYNCHRONIZE ? process.env.MYSQL_SYNCHRONIZE.toLowerCase() === 'true' : false;

const options: DataSourceOptions = {
    type: 'mysql',
    port: dbPort,
    host: process.env.MYSQL_PRIMARY_HOST,
    username: process.env.MYSQL_PRIMARY_USERNAME,
    password: process.env.MYSQL_PRIMARY_PASSWORD,
    database: process.env.MYSQL_PRIMARY_DATABASE,
    synchronize: synchronize,
    extra: { connectionLimit: 50 },
    logging: ['error'],
    maxQueryExecutionTime: 3000,
    entities: [
        path.join(__dirname, 'entity/**/*.entity.ts')
    ],
    migrations: [process.env.MYSQL_MIGRATIONS],
    subscribers: [process.env.MYSQL_SUBSCRIBERS]
};

const gDB = new DataSource(options);
export default gDB;
