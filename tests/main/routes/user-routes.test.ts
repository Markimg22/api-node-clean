import { client } from '@/infra/helpers';
import { setupApp } from '@/main/config/app';
import { HttpStatusCode } from '@/presentation/protocols';

import { mockAxios } from '@/tests/infra/mocks';

import { Express } from 'express';
import request from 'supertest';
import axios from 'axios';
import faker from '@faker-js/faker';

jest.setTimeout(30000);
jest.mock('axios');

let app: Express;

type SutTypes = {
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const mockedAxios = mockAxios();
  return {
    mockedAxios,
  };
};

describe('User Routes', () => {
  beforeAll(async () => {
    app = await setupApp();
  });

  afterAll(async () => {
    await client.performance.deleteMany();
    await client.user.deleteMany();
  });

  describe('POST /user', () => {
    it('should return 200 on auth an user', async () => {
      const { mockedAxios } = makeSut();
      mockedAxios.request.mockClear().mockResolvedValue({
        data: {
          id: faker.datatype.uuid(),
          name: faker.internet.userName(),
          email: faker.internet.email(),
          picture: faker.internet.avatar(),
        },
      });
      await request(app)
        .post('/api/user')
        .send({
          token: 'valid_token',
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 400 on auth an user', async () => {
      await request(app).post('/api/user').expect(HttpStatusCode.BAD_REQUEST);
    });

    it('should return 403 on auth an user', async () => {
      const { mockedAxios } = makeSut();
      mockedAxios.request.mockClear().mockResolvedValue({
        data: null,
      });
      await request(app)
        .post('/api/user')
        .send({
          token: 'any_token',
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });
});
