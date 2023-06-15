import { SendEmailController } from '@/presentation/controllers';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { TypeMail } from '@/presentation/protocols';
import { SendEmailMessage } from '@/presentation/messages';
import { SendEmailError } from '@/presentation/errors';

import { SendEmailWelcomeSpy, ValidationSpy } from '@/tests/presentation/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (typeMail: TypeMail): SendEmailController.Request => ({
  email: faker.internet.email(),
  typeMail,
});

type SutTypes = {
  sut: SendEmailController;
  validationSpy: ValidationSpy;
  sendEmailWelcomeSpy: SendEmailWelcomeSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sendEmailWelcomeSpy = new SendEmailWelcomeSpy();
  const sut = new SendEmailController(validationSpy, sendEmailWelcomeSpy);
  return {
    sut,
    validationSpy,
    sendEmailWelcomeSpy,
  };
};

describe('SendEmail Controller', () => {
  it('should return bad request if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error('');
    const httpResponse = await sut.handle(mockRequest(TypeMail.ANY));
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = mockRequest(TypeMail.ANY);
    await sut.handle(httpRequest);
    expect(validationSpy.input).toEqual(httpRequest);
  });

  it('should return server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest(TypeMail.ANY));
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call SendEmailWelcome with correct values and if email type is equal to WELCOME', async () => {
    const { sut, sendEmailWelcomeSpy } = makeSut();
    const httpRequest = mockRequest(TypeMail.WELCOME_MAIL);
    await sut.handle(httpRequest);
    expect(sendEmailWelcomeSpy.email).toBe(httpRequest.email);
    expect(sendEmailWelcomeSpy.callsCount).toBe(1);
  });

  it('should return ok if SendEmailWelcome returns true', async () => {
    const { sut } = makeSut();
    const httpRequest = mockRequest(TypeMail.WELCOME_MAIL);
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(ok(new SendEmailMessage(httpRequest.email)));
  });

  it('should return forbidden if SendEmailWelcome returns false', async () => {
    const { sut, sendEmailWelcomeSpy } = makeSut();
    sendEmailWelcomeSpy.result = false;
    const httpRequest = mockRequest(TypeMail.WELCOME_MAIL);
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(forbidden(new SendEmailError()));
  });

  it('should return server error if SendEmailWelcome throws', async () => {
    const { sut, sendEmailWelcomeSpy } = makeSut();
    jest.spyOn(sendEmailWelcomeSpy, 'send').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest(TypeMail.WELCOME_MAIL));
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
