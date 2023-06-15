import { CreateTaskController } from '@/presentation/controllers';
import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError, ok } from '@/presentation/helpers';

import {
  ValidationSpy,
  CreateTaskSpy,
  LoadTasksSpy,
} from '@/tests/presentation/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): CreateTaskController.Request => ({
  userId: faker.datatype.uuid(),
  emoji: faker.internet.emoji(),
  title: faker.random.word(),
  description: faker.random.word(),
  important: faker.datatype.boolean(),
  urgent: faker.datatype.boolean(),
  dailyTask: faker.datatype.boolean(),
  startDate: faker.datatype.datetime(),
  endDate: faker.datatype.datetime(),
});

type SutTypes = {
  sut: CreateTaskController;
  validationSpy: ValidationSpy;
  createTaskSpy: CreateTaskSpy;
  loadTasksSpy: LoadTasksSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const createTaskSpy = new CreateTaskSpy();
  const loadTasksSpy = new LoadTasksSpy();
  const sut = new CreateTaskController(
    validationSpy,
    createTaskSpy,
    loadTasksSpy
  );
  return {
    sut,
    validationSpy,
    createTaskSpy,
    loadTasksSpy,
  };
};

describe('CreateTask Controller', () => {
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

  it('should call CreateTask with correct values', async () => {
    const { sut, createTaskSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(createTaskSpy.params).toEqual(httpRequest);
  });

  it('should return server error if CreateTask throws', async () => {
    const { sut, createTaskSpy } = makeSut();
    jest.spyOn(createTaskSpy, 'create').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call LoadTasks with correct values', async () => {
    const { sut, loadTasksSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadTasksSpy.userId).toEqual(httpRequest.userId);
  });

  it('should return server error if LoadTasks throws', async () => {
    const { sut, loadTasksSpy } = makeSut();
    jest.spyOn(loadTasksSpy, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return ok if valid credentials are provided', async () => {
    const { sut, loadTasksSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(loadTasksSpy.tasks));
  });
});
