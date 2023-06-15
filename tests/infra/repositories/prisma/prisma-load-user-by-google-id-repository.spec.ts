import { PrismaLoadUserByGoogleIdRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateUserParams,
  mockCreateUserParamsWithOnlyRequiredParams,
  throwError,
} from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const makeSut = (): PrismaLoadUserByGoogleIdRepository => {
  const sut = new PrismaLoadUserByGoogleIdRepository(client);
  return sut;
};

describe('PrismaLoadUserByGoogleId Repository', () => {
  it('should return an user on success', async () => {
    const sut = makeSut();
    const createUserParams = mockCreateUserParams();
    const userCreated = await client.user.create({
      data: createUserParams,
    });
    const user = await sut.load(createUserParams.googleId);
    expect(user).toEqual({
      id: userCreated.id,
      name: userCreated.name,
      avatarUrl: userCreated.avatarUrl,
    });
  });

  it('should return an user on success', async () => {
    const sut = makeSut();
    const createUserParams = mockCreateUserParamsWithOnlyRequiredParams();
    const userCreated = await client.user.create({
      data: createUserParams,
    });
    const user = await sut.load(createUserParams.googleId);
    expect(user).toEqual({
      id: userCreated.id,
      name: userCreated.name,
    });
  });

  it('should return null if not user found', async () => {
    const sut = makeSut();
    const user = await sut.load(faker.datatype.uuid());
    expect(user).toBeNull();
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.user, 'findUnique').mockImplementationOnce(throwError);
    const promise = sut.load(faker.datatype.uuid());
    await expect(promise).rejects.toThrow();
  });
});
