import 'dotenv/config';
import express from 'express';

import configPassport from './config/passportConfig.js';

import apiRouter from './routes/api.js';
import authRouter from './routes/auth.js';

const app = express();

configPassport();

app.use('/', authRouter);
app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server started on port 3000'));