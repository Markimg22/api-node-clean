import { client } from '@/infra/helpers';
import { setupApp } from '@/main/config/app';
import { HttpStatusCode, TypeMail } from '@/presentation/protocols';

import { mockCreateUserParams } from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import { Express } from 'express';
import request from 'supertest';

jest.setTimeout(90000);

describe('Mail Routes', () => {
  let app: Express;
  let user: User;

  beforeAll(async () => {
    app = await setupApp();

    user = await client.user.create({
      data: mockCreateUserParams(),
    });
  });

  afterAll(async () => {
    await client.user.deleteMany();
  });

  describe('POST /mail', () => {
    it('should return 200 on send email', async () => {
      await request(app)
        .post('/api/mail')
        .send({
          email: user.email,
          typeMail: TypeMail.WELCOME_MAIL,
        })
        .expect(HttpStatusCode.OK);
    });

    it('should return 400 on send email', async () => {
      await request(app)
        .post('/api/mail')
        .send({
          email: 'invalid@mail',
          typeMail: TypeMail.ANY,
        })
        .expect(HttpStatusCode.BAD_REQUEST);
    });

    it('should return 403 on send email', async () => {
      await request(app)
        .post('/api/mail')
        .send({
          email: user.email,
          typeMail: TypeMail.ANY,
        })
        .expect(HttpStatusCode.FORBIDDEN);
    });
  });
});
