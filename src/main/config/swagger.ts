import swaggerConfig from '@/main/docs';
import { noCache } from '@/main/middlewares';

import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig));
};
