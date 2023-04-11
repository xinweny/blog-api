import { Router } from 'express';

import commentRouter from './comments.js';
import likeRouter from './likes.js';

import postController from '../controllers/postController.js';

const postRouter = Router();

postRouter.get('/', postController.getPosts);

postRouter.post('/', postController.createPost);

postRouter.use('/:postId/comments', commentRouter);

postRouter.use('/:postId/likes', likeRouter);

postRouter.get('/:postId', postController.getPost);

postRouter.put('/:postId', postController.updatePost);

postRouter.delete('/:postId', postController.deletePost);

export default postRouter;