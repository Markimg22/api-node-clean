import { PrismaLoadPerformanceRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import { throwError } from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaLoadPerformanceRepository => {
  const sut = new PrismaLoadPerformanceRepository(client);
  return sut;
};

describe('PrismaLoadPerformance Repository', () => {
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
    await client.performance.deleteMany();
    await client.user.deleteMany();
  });

  it('should return user performance on success', async () => {
    const sut = makeSut();
    await client.performance.create({
      data: { userId: user.id },
    });
    const performance = await sut.load(user.id);
    expect(performance).toBeTruthy();
  });

  it('should retun null if not user perfomance found', async () => {
    const sut = makeSut();
    const performance = await sut.load('any_id');
    expect(performance).toBeNull();
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest
      .spyOn(client.performance, 'findUnique')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });
});
