import { DbSendEmailWelcome } from '@/data/usecases';
import { MailProvider } from '@/data/protocols/mail';

import { mockMailOptions, throwError } from '@/tests/domain/mocks';
import {
  LoadUserByEmailRepositorySpy,
  MailProviderSpy,
} from '@/tests/data/mocks';

import faker from '@faker-js/faker';

type SutTypes = {
  sut: DbSendEmailWelcome;
  mailOptions: MailProvider.Options;
  mailProviderSpy: MailProviderSpy;
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
};

const makeSut = (): SutTypes => {
  const mailOptions = mockMailOptions();
  const mailProviderSpy = new MailProviderSpy();
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
  const sut = new DbSendEmailWelcome(
    mailOptions,
    mailProviderSpy,
    loadUserByEmailRepositorySpy
  );
  return {
    sut,
    mailOptions,
    mailProviderSpy,
    loadUserByEmailRepositorySpy,
  };
};

describe('DbSendEmailWelcome UseCase', () => {
  it('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    const email = faker.internet.email();
    await sut.send(email);
    expect(loadUserByEmailRepositorySpy.email).toBe(email);
  });

  it('should return fals if LoadUserByEmailRepository returns null', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    loadUserByEmailRepositorySpy.result = null;
    const emailSent = await sut.send(faker.internet.email());
    expect(emailSent).toBe(false);
  });

  it('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut();
    jest
      .spyOn(loadUserByEmailRepositorySpy, 'load')
      .mockImplementationOnce(throwError);
    const promise = sut.send(faker.internet.email());
    await expect(promise).rejects.toThrow();
  });

  it('should call MailProvider with correct options', async () => {
    const { sut, mailProviderSpy, mailOptions } = makeSut();
    await sut.send(faker.internet.email());
    expect(mailProviderSpy.options).toEqual({
      host: mailOptions.host,
      port: mailOptions.port,
      username: mailOptions.username,
      password: mailOptions.password,
      from: mailOptions.from,
      subject: mailOptions.subject,
      text: mailOptions.text,
      to: expect.any(String),
      html: expect.any(String),
    });
  });

  it('should throws if MailProvider throws', async () => {
    const { sut, mailProviderSpy } = makeSut();
    jest.spyOn(mailProviderSpy, 'send').mockImplementationOnce(throwError);
    const promise = sut.send(faker.internet.email());
    await expect(promise).rejects.toThrow();
  });

  it('should return true if MailProvider returns true', async () => {
    const { sut } = makeSut();
    const emailSent = await sut.send(faker.internet.email());
    expect(emailSent).toBe(true);
  });

  it('should return false if MailProvider returns false', async () => {
    const { sut, mailProviderSpy } = makeSut();
    mailProviderSpy.result = false;
    const emailSent = await sut.send(faker.internet.email());
    expect(emailSent).toBe(false);
  });
});
