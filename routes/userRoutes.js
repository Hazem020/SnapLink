import express from 'express';
import * as authController from '../controllers/authController.js';

const userRouter = express.Router();
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.post('/logout', authController.logOut);

export default userRouter;
