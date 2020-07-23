import { Router } from 'express';
import AuthController from './auth.controller';
import logger from '../../loaders/logger';
import middlewares from '../middlewares';
const route = Router();

export default (app: Router) => {
  logger.info('Auth routes loaded');

  app.use('/auth', route);

  route.post('/signup', AuthController.signUp);
  route.post('/signin', middlewares.isAuth);
  route.post('/forgotpassword', AuthController.forgotPassword);
};
