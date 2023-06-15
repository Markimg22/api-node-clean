import { DbCreateTokens } from '@/data/usecases';

import { EncrypterSpy } from '@/tests/data/mocks';
import { mockCreateTokensParams, throwError } from '@/tests/domain/mocks';

type SutTypes = {
  sut: DbCreateTokens;
  encrypterSpy: EncrypterSpy;
};

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy();
  const sut = new DbCreateTokens(encrypterSpy);
  return {
    sut,
    encrypterSpy,
  };
};

describe('DbCreateTokens UseCase', () => {
  it('should call Encrypter with correct values', async () => {
    const { sut, encrypterSpy } = makeSut();
    const createTokensParams = mockCreateTokensParams();
    await sut.create(createTokensParams);
    const { name, avatarUrl, subject } = createTokensParams;
    expect(encrypterSpy.payloads).toEqual([
      { name, avatarUrl },
      { name, avatarUrl },
    ]);
    expect(encrypterSpy.params.subject).toBe(subject);
  });

  it('should return correct refresh token and access token on success', async () => {
    const { sut, encrypterSpy } = makeSut();
    const createTokensParams = mockCreateTokensParams();
    const tokens = await sut.create(createTokensParams);
    expect(tokens).toEqual({
      refreshToken: encrypterSpy.cipherText,
      accessToken: encrypterSpy.cipherText,
    });
  });

  it('should call Encrypter twice', async () => {
    const { sut, encrypterSpy } = makeSut();
    await sut.create(mockCreateTokensParams());
    expect(encrypterSpy.callsCount).toBe(2);
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateTokensParams());
    await expect(promise).rejects.toThrow();
  });
});
