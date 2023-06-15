import { PrismaLoadUserByIdRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import { mockCreateUserParams, throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const makeSut = (): PrismaLoadUserByIdRepository => {
  const sut = new PrismaLoadUserByIdRepository(client);
  return sut;
};

describe('PrismaLoadUserById Repository', () => {
  afterEach(async () => {
    await client.user.deleteMany();
  });

  it('should return an user on success', async () => {
    const sut = makeSut();
    const id = faker.datatype.uuid();
    const createUserParams = { ...mockCreateUserParams(), id };
    await client.user.create({ data: createUserParams });
    const user = await sut.load(id);
    expect(user).toEqual({
      email: createUserParams.email,
      name: createUserParams.name,
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
