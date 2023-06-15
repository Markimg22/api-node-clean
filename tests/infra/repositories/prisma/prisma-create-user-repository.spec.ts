import { PrismaCreateUserRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateUserParams,
  mockCreateUserParamsWithOnlyRequiredParams,
  throwError,
} from '@/tests/domain/mocks';

const makeSut = (): PrismaCreateUserRepository => {
  const sut = new PrismaCreateUserRepository(client);
  return sut;
};

describe('PrismaCreateUser Repository', () => {
  afterAll(async () => {
    await client.user.deleteMany();
  });

  it('should return user if user created on success', async () => {
    const sut = makeSut();
    const user = await sut.create(mockCreateUserParams());
    const userFound = await client.user.findFirst({ where: { id: user.id } });
    expect(user).toEqual({
      id: userFound?.id,
      name: userFound?.name,
      avatarUrl: userFound?.avatarUrl,
    });
  });

  it('should return user if user created on success', async () => {
    const sut = makeSut();
    const user = await sut.create(mockCreateUserParamsWithOnlyRequiredParams());
    const userFound = await client.user.findFirst({ where: { id: user.id } });
    expect(user).toEqual({
      id: userFound?.id,
      name: userFound?.name,
    });
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.user, 'create').mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateUserParams());
    await expect(promise).rejects.toThrow();
  });
});
