import { Router } from 'express';

import authRouter from './auth.js';
import userRouter from './users.js';
import postRouter from './posts.js';

const apiRouter = Router();

apiRouter.use('/', authRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/posts', postRouter);

export default apiRouter;