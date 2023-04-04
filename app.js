import 'dotenv/config';
import express from 'express';

import configMongoDB from './config/mongoConfig.js';
import configPassport from './config/passportConfig.js';

import apiRouter from './routes/api.js';

configMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configPassport();

app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server started on port 3000'));