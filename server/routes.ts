import { Router } from 'express';
import auth from './api/auth/auth.routes';

export default () => {
  const app = Router();

  auth(app);

  return app;
};
