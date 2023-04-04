import { Router } from 'express';

import userController from '../controllers/userController.js';
import postController from '../controllers/postController.js';

const userRouter = Router();

userRouter.get('/', userController.listUsers);
userRouter.get('/:userId/posts', postController.getUserPosts);
userRouter.get('/:userId', userController.getUser);

export default userRouter;