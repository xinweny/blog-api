import { Router } from 'express';

import postController from '../controllers/postController.js';

const postRouter = Router();

postRouter.get('/', postController.getPosts);

postRouter.post('/', postController.createPost);

postRouter.get('/:postId', postController.getPost);

postRouter.put('/:postId', postController.updatePost);

postRouter.delete('/:postId', postController.deletePost);

export default postRouter;