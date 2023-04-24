import { Router } from 'express';

import authRouter from './auth.js';
import userRouter from './users.js';
import postRouter from './posts.js';
import commentRouter from './comments.js';
import likeRouter from './likes.js';

const apiRouter = Router();

apiRouter.get('/', (req, res) => res.json({}));

apiRouter.use('/', authRouter);

apiRouter.use('/users', userRouter);

apiRouter.use('/posts', postRouter);

apiRouter.use('/comments', commentRouter);

apiRouter.use('/likes', likeRouter);

export default apiRouter;