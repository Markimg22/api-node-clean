import { setupApp } from '@/main/config/app';
import { client } from '@/infra/helpers';
import { env } from '@/main/config/env';
import { HttpStatusCode } from '@/presentation/protocols';

import { mockCreateUserParams } from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import { Express } from 'express';
import request from 'supertest';
import { sign } from 'jsonwebtoken';

jest.setTimeout(30000);

let app: Express;
let user: User;

const mockAccessToken = async (): Promise<string> => {
  const accessToken = sign(
    { name: user.name, avatarUrl: user.avatarUrl },
    env.jwt.accessTokenSecret,
    { subject: user.id }
  );
  return accessToken;
};

describe('Performance Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
    user = await client.user.create({
      data: mockCreateUserParams(),
    });
    await client.performance.create({
      data: { userId: user.id },
    });
  });

  afterAll(async () => {
    await client.performance.deleteMany();
    await client.user.deleteMany();
  });

  describe('GET /performance', () => {
    it('should return 200 on load performance', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .get('/api/performance')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.OK);
    });

    it('should return 403 on load performance', async () => {
      await request(app)
        .get('/api/performance')
        .expect(HttpStatusCode.FORBIDDEN);
    });

    it('should return 404 on load performance', async () => {
      await request(app)
        .get('/api/performance')
        .set(
          'x-access-token',
          sign({ sub: 'any_id', name: 'Any Name' }, env.jwt.accessTokenSecret)
        )
        .expect(HttpStatusCode.NOT_FOUND);
    });
  });

  describe('PUT /performance', () => {
    it('should return 200 on update performance', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .put('/api/performance')
        .set('x-access-token', accessToken)
        .send({
          totalTimeOfFocus: '12:01',
          totalTimeOfRest: '12:01',
          totalTimeImportantTasks: '12:01',
          totalTimeUrgentTasks: '12:01',
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 403 on update performance', async () => {
      await request(app)
        .put('/api/performance')
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });
});
