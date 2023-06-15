import { PrismaCheckUserByEmailRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import { throwError } from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaCheckUserByEmailRepository => {
  const sut = new PrismaCheckUserByEmailRepository(client);
  return sut;
};

describe('PrismaCheckUserByEmail Repository', () => {
  let user: User;

  beforeAll(async () => {
    user = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
  });

  afterAll(async () => {
    await client.user.deleteMany();
  });

  it('should return true if find an user', async () => {
    const sut = makeSut();
    const userExists = await sut.check(user.email);
    expect(userExists).toBe(true);
  });

  it('should return false if not find a user', async () => {
    const sut = makeSut();
    const userExists = await sut.check('any_email');
    expect(userExists).toBe(false);
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.user, 'findFirst').mockImplementationOnce(throwError);
    const promise = sut.check('any_email@mail.com');
    await expect(promise).rejects.toThrow();
  });
});
