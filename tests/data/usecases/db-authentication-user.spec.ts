import { DbAuthenticationUser } from '@/data/usecases';
import { AuthenticationUser } from '@/domain/usecases';
import { env } from '@/main/config/env';

import { mockUserInfoFromGoogle, throwError } from '@/tests/domain/mocks';
import { CreateTokensSpy } from '@/tests/presentation/mocks';
import {
  CreateUserRepositorySpy,
  HttpClientSpy,
  LoadUserByGoogleIdRepositorySpy,
} from '@/tests/data/mocks';

import faker from '@faker-js/faker';

type SutTypes = {
  sut: DbAuthenticationUser;
  httpClientSpy: HttpClientSpy<AuthenticationUser.UserInfoFromGoogle>;
  loadUserByGoogleIdRepositorySpy: LoadUserByGoogleIdRepositorySpy;
  createUserRepositorySpy: CreateUserRepositorySpy;
  createTokensSpy: CreateTokensSpy;
};

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const loadUserByGoogleIdRepositorySpy = new LoadUserByGoogleIdRepositorySpy();
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const createTokensSpy = new CreateTokensSpy();
  const sut = new DbAuthenticationUser(
    env.google.userInfoUrl,
    httpClientSpy,
    loadUserByGoogleIdRepositorySpy,
    createUserRepositorySpy,
    createTokensSpy
  );
  return {
    sut,
    httpClientSpy,
    loadUserByGoogleIdRepositorySpy,
    createUserRepositorySpy,
    createTokensSpy,
  };
};

describe('DbAuthenticationUser UseCase', () => {
  it('should call HttpClient with correct values', async () => {
    const { sut, httpClientSpy } = makeSut();
    const token = faker.datatype.uuid();
    await sut.auth({ token });
    expect(httpClientSpy.url).toBe(env.google.userInfoUrl);
    expect(httpClientSpy.method).toBe('get');
    expect(httpClientSpy.headers).toEqual({
      Authorization: `Bearer ${token}`,
    });
  });

  it('should throw if HttpClient throws', async () => {
    const { sut, httpClientSpy } = makeSut();
    jest.spyOn(httpClientSpy, 'request').mockImplementationOnce(throwError);
    const promise = sut.auth({ token: faker.datatype.uuid() });
    await expect(promise).rejects.toThrow();
  });

  it('should return null if HttpClient returns null in body', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response.body = null;
    const result = await sut.auth({ token: faker.datatype.uuid() });
    expect(result).toBeNull();
  });

  it('should call LoadUserByGoogleIdRepository with correct google id', async () => {
    const { sut, httpClientSpy, loadUserByGoogleIdRepositorySpy } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    await sut.auth({ token: faker.datatype.uuid() });
    expect(loadUserByGoogleIdRepositorySpy.googleId).toBe(
      httpClientSpy.response.body?.id
    );
  });

  it('should throw if LoadUserByGoogleIdRepository throws', async () => {
    const { sut, loadUserByGoogleIdRepositorySpy, httpClientSpy } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    jest
      .spyOn(loadUserByGoogleIdRepositorySpy, 'load')
      .mockImplementationOnce(throwError);
    const promise = sut.auth({ token: faker.datatype.uuid() });
    await expect(promise).rejects.toThrow();
  });

  it('should call CreateUserRepository with correct values and if user not found', async () => {
    const {
      sut,
      httpClientSpy,
      loadUserByGoogleIdRepositorySpy,
      createUserRepositorySpy,
    } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    loadUserByGoogleIdRepositorySpy.result = null;
    await sut.auth({ token: faker.datatype.uuid() });
    expect(createUserRepositorySpy.data).toEqual({
      googleId: httpClientSpy.response.body?.id,
      email: httpClientSpy.response.body?.email,
      name: httpClientSpy.response.body?.name,
      avatarUrl: httpClientSpy.response.body?.picture,
    });
    expect(createUserRepositorySpy.callsCount).toBe(1);
  });

  it('should not call CreateUserRepository if LoadUserByGoogleIdRepository returns an user', async () => {
    const { sut, createUserRepositorySpy, httpClientSpy } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    await sut.auth({ token: faker.datatype.uuid() });
    expect(createUserRepositorySpy.callsCount).toBe(0);
  });

  it('should throw if CreateUserRepository throws', async () => {
    const {
      sut,
      createUserRepositorySpy,
      httpClientSpy,
      loadUserByGoogleIdRepositorySpy,
    } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    loadUserByGoogleIdRepositorySpy.result = null;
    jest
      .spyOn(createUserRepositorySpy, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.auth({ token: faker.datatype.uuid() });
    await expect(promise).rejects.toThrow();
  });

  it('should call CreateTokens with correct values', async () => {
    const {
      sut,
      httpClientSpy,
      createTokensSpy,
      loadUserByGoogleIdRepositorySpy,
    } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    await sut.auth({ token: faker.datatype.uuid() });
    const user = loadUserByGoogleIdRepositorySpy.result;
    expect(createTokensSpy.params).toEqual({
      subject: user?.id,
      name: user?.name,
      avatarUrl: user?.avatarUrl,
    });
  });

  it('should throw if CreateTokens throws', async () => {
    const { sut, createTokensSpy, httpClientSpy } = makeSut();
    jest.spyOn(createTokensSpy, 'create').mockImplementationOnce(throwError);
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    const promise = sut.auth({ token: faker.datatype.uuid() });
    await expect(promise).rejects.toThrow();
  });

  it('should return correct access token and refresh token', async () => {
    const {
      sut,
      createTokensSpy,
      httpClientSpy,
      loadUserByGoogleIdRepositorySpy,
    } = makeSut();
    httpClientSpy.response.body = mockUserInfoFromGoogle();
    const result = await sut.auth({ token: faker.datatype.uuid() });
    const { accessToken, refreshToken } = createTokensSpy.result;
    expect(result).toEqual({
      tokens: { accessToken, refreshToken },
      user: {
        id: loadUserByGoogleIdRepositorySpy.result?.id,
        name: loadUserByGoogleIdRepositorySpy.result?.name,
        avatarUrl: loadUserByGoogleIdRepositorySpy.result?.avatarUrl,
      },
    });
  });
});
