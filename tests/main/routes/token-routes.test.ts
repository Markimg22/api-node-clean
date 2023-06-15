import { setupApp } from '@/main/config/app';
import { env } from '@/main/config/env';
import { HttpStatusCode } from '@/presentation/protocols';
import faker from '@faker-js/faker';

import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import request from 'supertest';

let app: Express;

describe('Token Routes', () => {
  let refreshToken: string;

  beforeAll(async () => {
    app = await setupApp();
    refreshToken = sign(
      {
        sub: faker.datatype.uuid(),
        name: faker.internet.userName(),
        avatarUrl: faker.internet.avatar(),
      },
      env.jwt.refreshTokenSecret
    );
  });

  describe('PUT /token', () => {
    it('should return 200 on refresh token', async () => {
      await request(app)
        .put('/api/token')
        .send({ refreshToken })
        .expect(HttpStatusCode.OK);
    });

    it('should return 400 on refresh token', async () => {
      await request(app).put('/api/token').expect(HttpStatusCode.BAD_REQUEST);
    });

    it('should return 403 on refresh token', async () => {
      await request(app)
        .put('/api/token')
        .send({ refreshToken: sign({}, env.jwt.refreshTokenSecret) })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });
});
