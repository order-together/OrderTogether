import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import { Application } from 'express';
import gDB from './initDataSource';
import dotenv from 'dotenv-flow';

dotenv.config();


const startServer = async () => {
    try {
        await gDB.initialize();

        const app: Application = express();

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });

        app.use(bodyParser.json());

        app.listen(process.env.PORT, () => {
            console.log(`Express server has started on port ${process.env.PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
};

startServer();
