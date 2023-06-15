import { setupApp } from '@/main/config/app';
import { env } from '@/main/config/env';

import { Express } from 'express';
import request from 'supertest';

let app: Express;

describe('CORS Middleware', () => {
  beforeAll(async () => {
    app = await setupApp();
  });

  it('should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send();
    });
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', env.accessUrl)
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
