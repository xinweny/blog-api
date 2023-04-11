import { Router } from 'express';

import likeController from '../controllers/likeController.js';

const likeRouter = Router({ mergeParams: true });

likeRouter.post('/', likeController.likePost);

likeRouter.delete('/', likeController.unlikePost);

export default likeRouter;