import { Router } from 'express';

import authController from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/register', authController.signup);

authRouter.post('/login', authController.login);

authRouter.post('/logout', authController.logout);

export default authRouter;