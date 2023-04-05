import { Router } from 'express';

import userController from '../controllers/userController.js';
import postController from '../controllers/postController.js';
import commentController from '../controllers/commentController.js';

const userRouter = Router();

userRouter.get('/', userController.listUsers);

userRouter.get('/:userId/posts', postController.getPostsByUser);

userRouter.get('/:userId/comments', commentController.getCommentsByUser)

userRouter.get('/:userId', userController.getUser);

userRouter.put('/:userId', userController.updateUser);

export default userRouter;