import 'dotenv/config';
import express from 'express';

import apiRouter from './routes/api';
import authRouter from './routes/auth';

const app = express();

app.use('/', authRouter);
app.use('/api', apiRouter);

app.listen(3000, () => console.log('Server started on port 3000'));