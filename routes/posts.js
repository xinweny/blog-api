import { Router } from 'express';

import postController from '../controllers/postController.js';

const postRouter = Router();

postRouter.get('/', postController.listPosts);

postRouter.post('/', postController.createPost);

postRouter.get('/:postId', postController.getPost);

postRouter.put('/:postId', postController.updatePost);

postRouter.delete('/', postController.deletePost);

export default postRouter;