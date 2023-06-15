import { AuthMiddleware } from '@/presentation/middlewares';
import { forbidden, serverError } from '@/presentation/helpers';
import { AccessDeniedError } from '@/presentation/errors';

import { DecrypterSpy } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.datatype.uuid(),
});

type SutTypes = {
  sut: AuthMiddleware;
  decrypterSpy: DecrypterSpy;
};

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new AuthMiddleware(decrypterSpy);
  return {
    sut,
    decrypterSpy,
  };
};

describe('Auth Middleware', () => {
  it('should return forbidden if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('should call Decrypter with correct values', async () => {
    const { sut, decrypterSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(decrypterSpy.params.cipherText).toBe(httpRequest.accessToken);
  });

  it('should return server error if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return forbidden access denied error if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut();
    decrypterSpy.plainText = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
