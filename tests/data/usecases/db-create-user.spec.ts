import { DbCreateUser } from '@/data/usecases';

import {
  CheckUserByEmailRepositorySpy,
  CreateUserRepositorySpy,
} from '@/tests/data/mocks';
import { mockCreateUserParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbCreateUser;
  checkUserByEmailRepositorySpy: CheckUserByEmailRepositorySpy;
  createUserRepositorySpy: CreateUserRepositorySpy;
};

const makeSut = (): SutTypes => {
  const checkUserByEmailRepositorySpy = new CheckUserByEmailRepositorySpy();
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const sut = new DbCreateUser(
    checkUserByEmailRepositorySpy,
    createUserRepositorySpy
  );
  return {
    sut,
    checkUserByEmailRepositorySpy,
    createUserRepositorySpy,
  };
};

describe('DbCreateUser UseCase', () => {
  it('should return null if CheckUserByEmailRepository returns true', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut();
    checkUserByEmailRepositorySpy.userExists = true;
    const result = await sut.create(mockCreateUserParams());
    expect(result).toBeNull();
  });

  it('should return user id if CheckUserByEmailRepository returns false', async () => {
    const { sut, createUserRepositorySpy } = makeSut();
    const user = await sut.create(mockCreateUserParams());
    expect(user?.id).toBe(createUserRepositorySpy.user.id);
  });

  it('should call CheckUserByEmailRepository with correct email', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut();
    const createUserParams = mockCreateUserParams();
    await sut.create(createUserParams);
    expect(checkUserByEmailRepositorySpy.email).toBe(createUserParams.email);
  });

  it('should throws if CheckUserByEmailRepository throws', async () => {
    const { sut, checkUserByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(checkUserByEmailRepositorySpy, 'check')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateUserParams());
    await expect(promise).rejects.toThrow();
  });

  it('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositorySpy } = makeSut();
    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateUserParams());
    await expect(promise).rejects.toThrow();
  });
});
