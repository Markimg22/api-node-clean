import { RefreshTokenController } from '@/presentation/controllers';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';

import {
  CreateTokensSpy,
  ValidationSpy,
  VerifyRefreshTokenSpy,
} from '@/tests/presentation/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): RefreshTokenController.Request => ({
  refreshToken: faker.datatype.uuid(),
});

type SutTypes = {
  sut: RefreshTokenController;
  validationSpy: ValidationSpy;
  verifyRefreshTokenSpy: VerifyRefreshTokenSpy;
  createTokensSpy: CreateTokensSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const verifyRefreshTokenSpy = new VerifyRefreshTokenSpy();
  const createTokensSpy = new CreateTokensSpy();
  const sut = new RefreshTokenController(
    validationSpy,
    verifyRefreshTokenSpy,
    createTokensSpy
  );
  return {
    sut,
    validationSpy,
    verifyRefreshTokenSpy,
    createTokensSpy,
  };
};

describe('RefreshToken Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validationSpy.input).toEqual(httpRequest);
  });

  it('should return bad request if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error('');
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should return server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call VerifyRefreshToken with correct values', async () => {
    const { sut, verifyRefreshTokenSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(verifyRefreshTokenSpy.refreshToken).toEqual(
      httpRequest.refreshToken
    );
  });

  it('should return server error if VerifyRefreshToken throws', async () => {
    const { sut, verifyRefreshTokenSpy } = makeSut();
    jest
      .spyOn(verifyRefreshTokenSpy, 'verify')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return forbidden if VerifyRefreshToken returns null', async () => {
    const { sut, verifyRefreshTokenSpy } = makeSut();
    verifyRefreshTokenSpy.result = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      forbidden(new InvalidParamError('refreshToken'))
    );
  });

  it('should call CreateTokens with correct values', async () => {
    const { sut, createTokensSpy, verifyRefreshTokenSpy } = makeSut();
    await sut.handle(mockRequest());
    expect(createTokensSpy.params).toEqual({
      name: verifyRefreshTokenSpy.result?.name,
      avatarUrl: verifyRefreshTokenSpy.result?.avatarUrl,
      subject: verifyRefreshTokenSpy.result?.id,
    });
  });

  it('should return server error if CreateTokens throws', async () => {
    const { sut, createTokensSpy } = makeSut();
    jest.spyOn(createTokensSpy, 'create').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return ok if refresh token on success', async () => {
    const { sut, createTokensSpy, verifyRefreshTokenSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(
      ok({
        tokens: createTokensSpy.result,
        user: {
          id: verifyRefreshTokenSpy.result?.id,
          name: verifyRefreshTokenSpy.result?.name,
          avatarUrl: verifyRefreshTokenSpy.result?.avatarUrl,
        },
      })
    );
  });
});
