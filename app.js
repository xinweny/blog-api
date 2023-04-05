import 'dotenv/config';
import express from 'express';

import configMongoDB from './config/mongoConfig.js';
import configPassport from './config/passportConfig.js';
import { handle404Error, handleServerError } from './config/errorsConfig.js';

import apiRouter from './routes/api.js';

configMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configPassport(app);

// ROUTES
app.use('/api', apiRouter);

// ERROR HANDLING
handle404Error(app);
handleServerError(app);

app.listen(3000, () => console.log('Server started on port 3000'));