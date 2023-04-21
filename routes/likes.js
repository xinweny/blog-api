import { Router } from 'express';

import likeController from '../controllers/likeController.js';

const likeRouter = Router();

likeRouter.get('/', likeController.getLikesCount);

likeRouter.get('/', likeController.getLike);

likeRouter.post('/', likeController.likePost);

likeRouter.delete('/', likeController.unlikePost);

export default likeRouter;