import { PrismaLoadUserByEmailRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateUserParams,
  mockCreateUserParamsWithOnlyRequiredParams,
  throwError,
} from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const makeSut = (): PrismaLoadUserByEmailRepository => {
  const sut = new PrismaLoadUserByEmailRepository(client);
  return sut;
};

describe('PrismaLoadUserByEmail Repository', () => {
  afterEach(async () => {
    await client.user.deleteMany();
  });

  it('should return an user on success', async () => {
    const sut = makeSut();
    const createUserParams = mockCreateUserParams();
    await client.user.create({ data: createUserParams });
    const user = await sut.load(createUserParams.email);
    expect(user).toEqual({
      id: expect.any(String),
      name: createUserParams.name,
      email: createUserParams.email,
      googleId: createUserParams.googleId,
      avatarUrl: createUserParams.avatarUrl,
    });
  });

  it('should return an user on success', async () => {
    const sut = makeSut();
    const createUserParams = mockCreateUserParamsWithOnlyRequiredParams();
    await client.user.create({ data: createUserParams });
    const user = await sut.load(createUserParams.email);
    expect(user).toEqual({
      id: expect.any(String),
      name: createUserParams.name,
      email: createUserParams.email,
      googleId: createUserParams.googleId,
    });
  });

  it('should return null if not user found', async () => {
    const sut = makeSut();
    const result = await sut.load(faker.internet.email());
    expect(result).toBeNull();
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.user, 'findUnique').mockImplementationOnce(throwError);
    const promise = sut.load(faker.internet.email());
    await expect(promise).rejects.toThrow();
  });
});
