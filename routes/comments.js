import { Router } from 'express';

import commentController from '../controllers/commentController.js';

const commentRouter = Router();

commentRouter.get('/', commentController.getComments);

commentRouter.post('/', commentController.createComment);

commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;