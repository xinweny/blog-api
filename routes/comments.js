import { Router } from 'express';

import commentController from '../controllers/commentController.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', commentController.getCommentsByPost);

commentRouter.post('/', commentController.createComment);

commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;