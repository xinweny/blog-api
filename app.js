import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

import configMongoDB from './config/mongoConfig.js';
import configPassport from './config/passportConfig.js';
import { create404Error, handleErrors } from './config/errorsConfig.js';

import apiRouter from './routes/api.js';

configMongoDB();

const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(compression());
app.use(helmet());
app.use(RateLimit({ windowMs: 6000, max: 20 }));

configPassport(app);

// ROUTES
app.get('/', (req, res) => res.redirect('/api'));
app.use('/api', apiRouter);

// ERROR HANDLING
create404Error(app);
handleErrors(app);

app.listen(3000, () => console.log('Server started on port 3000'));