import { JwtAdapter } from '@/infra/cryptography';

import { throwError } from '@/tests/domain/mocks';

import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token';
  },
}));

const makeSut = (): JwtAdapter => {
  const sut = new JwtAdapter();
  return sut;
};

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign with correct values', async () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      await sut.encrypt({
        payload: {
          id: 'any_id',
        },
        secret: 'any_secret',
      });
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'any_secret', {
        expiresIn: undefined,
      });
    });

    it('should return a token on sign succeds', async () => {
      const sut = makeSut();
      const token = await sut.encrypt({
        payload: {
          id: 'any_id',
        },
        secret: 'any_secret',
      });
      expect(token).toBe('any_token');
    });

    it('should throw if sign throws', async () => {
      const sut = makeSut();
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError);
      const promise = sut.encrypt({
        payload: {
          id: 'any_id',
        },
        secret: 'any_secret',
      });
      await expect(promise).rejects.toThrow();
    });
  });
});
