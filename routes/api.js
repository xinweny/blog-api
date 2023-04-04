import { Router } from 'express';

import userRouter from './users';
import postRouter from './posts';
import commentRouter from './comments';
import likeRouter from './likes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/posts', postRouter);
apiRouter.use('/posts/:postId/comments', commentRouter);
apiRouter.use('/posts/:postId/likes', likeRouter);

export default apiRouter;