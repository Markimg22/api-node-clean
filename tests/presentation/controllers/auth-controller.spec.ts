import { AuthController } from '@/presentation/controllers';
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers';
import { InvalidParamError, MissingParamError } from '@/presentation/errors';

import {
  AuthenticationUserSpy,
  ValidationSpy,
} from '@/tests/presentation/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): AuthController.Request => ({
  token: faker.datatype.uuid(),
});

type SutTypes = {
  sut: AuthController;
  validationSpy: ValidationSpy;
  authenticationUserSpy: AuthenticationUserSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const authenticationUserSpy = new AuthenticationUserSpy();
  const sut = new AuthController(validationSpy, authenticationUserSpy);
  return {
    sut,
    validationSpy,
    authenticationUserSpy,
  };
};

describe('Auth Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validationSpy.input).toEqual(httpRequest);
  });

  it('should return bad request if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError(faker.random.word());
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should return server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call AuthenticationUser with correct values', async () => {
    const { sut, authenticationUserSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(authenticationUserSpy.params.token).toBe(httpRequest.token);
  });

  it('should return forbidden if AuthenticationUser returns null', async () => {
    const { sut, authenticationUserSpy } = makeSut();
    authenticationUserSpy.result = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('token')));
  });

  it('should return server error if AuthenticationUser throws', async () => {
    const { sut, authenticationUserSpy } = makeSut();
    jest
      .spyOn(authenticationUserSpy, 'auth')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return ok if AuthenticationUser returns accessToken', async () => {
    const { sut, authenticationUserSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(authenticationUserSpy.result));
  });
});
