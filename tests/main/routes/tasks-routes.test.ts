import { client } from '@/infra/helpers';
import { setupApp } from '@/main/config/app';
import { env } from '@/main/config/env';
import { HttpStatusCode } from '@/presentation/protocols';

import {
  mockCreateTaskParams,
  mockCreateUserParams,
} from '@/tests/domain/mocks';

import { Express } from 'express';
import { sign } from 'jsonwebtoken';
import request from 'supertest';
import { User } from '@prisma/client';
import faker from '@faker-js/faker';

jest.setTimeout(30000);

let app: Express;
let user: User;

const mockAccessToken = async (): Promise<string> => {
  user = await client.user.create({
    data: mockCreateUserParams(),
  });
  const accessToken = sign(
    { name: user.name, avatarUrl: user.avatarUrl },
    env.jwt.accessTokenSecret,
    { subject: user.id }
  );
  return accessToken;
};

describe('Tasks Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
  });

  afterEach(async () => {
    await client.task.deleteMany();
  });

  afterAll(async () => {
    await client.performance.deleteMany();
    await client.user.deleteMany();
  });

  describe('POST /task', () => {
    it('should return 200 on create task', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .post('/api/tasks')
        .set('x-access-token', accessToken)
        .send({
          emoji: faker.internet.emoji(),
          title: faker.random.word(),
          description: faker.random.word(),
          dailyTask: faker.datatype.boolean(),
          startDate: faker.datatype.datetime(),
          endDate: faker.datatype.datetime(),
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 400 on create task', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .post('/api/tasks')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.BAD_REQUEST);
    });

    it('should return 403 on create task', async () => {
      await request(app)
        .post('/api/tasks')
        .send({
          title: 'Title Test',
          description: 'Description Test',
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });

  describe('GET /tasks', () => {
    it('should return 200 on load tasks', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .get('/api/tasks')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.OK);
    });

    it('should return 403 on load tasks', async () => {
      await request(app)
        .get('/api/tasks')
        .send({ title: '' })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });

  describe('PUT /task', () => {
    it('should return 200 on update task', async () => {
      const accessToken = await mockAccessToken();
      await client.task.create({
        data: mockCreateTaskParams(user.id),
      });
      const tasks = await client.task.findMany({
        where: { userId: user.id },
      });
      await request(app)
        .put('/api/tasks')
        .set('x-access-token', accessToken)
        .send({
          id: tasks[0].id,
          completed: true,
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 403 on update task', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .put('/api/tasks')
        .set('x-access-token', accessToken)
        .send({
          id: 'invalid_task_id',
          completed: true,
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });

    it('should return 400 on update task', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .put('/api/tasks')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.BAD_REQUEST);
    });
  });

  describe('DELETE /task', () => {
    it('should return 200 on delete task', async () => {
      const accessToken = await mockAccessToken();
      await client.task.create({
        data: mockCreateTaskParams(user.id),
      });
      const tasks = await client.task.findMany({
        where: { userId: user.id },
      });
      await request(app)
        .delete('/api/tasks')
        .set('x-access-token', accessToken)
        .send({
          id: tasks[0].id,
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 403 on delete task', async () => {
      const accessToken = await mockAccessToken();
      await request(app)
        .delete('/api/tasks')
        .set('x-access-token', accessToken)
        .send({
          id: 'any_id',
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });

    it('should return 400 on delete task', async () => {
      await request(app)
        .delete('/api/tasks')
        .send({
          id: '',
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });
});
