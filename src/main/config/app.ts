import { setupMiddlewares } from '@/main/config/middlewares';
import { setupRoutes } from '@/main/config/routes';
import { setupSwagger } from '@/main/config/swagger';

import express, { Express } from 'express';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  setupSwagger(app);
  setupMiddlewares(app);
  setupRoutes(app);
  return app;
};
