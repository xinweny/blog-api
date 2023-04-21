import { Router } from 'express';

import commentController from '../controllers/commentController.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', commentController.getComments);

commentRouter.post('/', commentController.createComment);

commentRouter.put('/:commentId', commentController.updateComment);

commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;