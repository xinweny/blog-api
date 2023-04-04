import { Router } from 'express';

import userRouter from './users.js';
import postRouter from './posts.js';
import commentRouter from './comments.js';
import likeRouter from './likes.js';

const apiRouter = Router();

apiRouter.use('/users', userRouter);

apiRouter.use('/posts', postRouter);

apiRouter.use('/posts/:postId/comments', commentRouter);

apiRouter.use('/posts/:postId/likes', likeRouter);

export default apiRouter;