import { DbVerifyRefreshToken } from '@/data/usecases';
import { env } from '@/main/config/env';

import { DecrypterSpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

type SutTypes = {
  sut: DbVerifyRefreshToken;
  decrypterSpy: DecrypterSpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new DbVerifyRefreshToken(decrypterSpy);
  return {
    sut,
    decrypterSpy,
  };
};

describe('DbVerifyRefreshToken UseCase', () => {
  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut();
    const refreshToken = faker.datatype.uuid();
    await sut.verify(refreshToken);
    expect(decrypterSpy.params).toEqual({
      cipherText: refreshToken,
      secret: env.jwt.refreshTokenSecret,
    });
  });

  it('should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const promise = sut.verify('any_refresh_token');
    await expect(promise).rejects.toThrow();
  });

  it('should returns user infos if Decrypter returns infos', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.plainText = {
      name: faker.internet.userName(),
      sub: faker.datatype.uuid(),
    };
    const userInfo = await sut.verify('valid_refresh_token');
    expect(userInfo).toEqual({
      id: decrypterSpy.plainText.sub,
      name: decrypterSpy.plainText.name,
    });
  });

  it('should return null if Decrypter returns invalid token model', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.plainText = null;
    const userInfo = await sut.verify('any_refresh_token');
    expect(userInfo).toBeNull();
  });
});
