import { UpdateTaskController } from '@/presentation/controllers';
import { serverError, ok, badRequest, forbidden } from '@/presentation/helpers';
import { MissingParamError, InvalidParamError } from '@/presentation/errors';

import {
  LoadTasksSpy,
  UpdateTaskSpy,
  ValidationSpy,
} from '@/tests/presentation/mocks';
import { throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): UpdateTaskController.Request => ({
  id: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  completed: false,
});

type SutTypes = {
  sut: UpdateTaskController;
  updateTaskSpy: UpdateTaskSpy;
  loadTasksSpy: LoadTasksSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const updateTaskSpy = new UpdateTaskSpy();
  const loadTasksSpy = new LoadTasksSpy();
  const validationSpy = new ValidationSpy();
  const sut = new UpdateTaskController(
    validationSpy,
    updateTaskSpy,
    loadTasksSpy
  );
  return {
    sut,
    updateTaskSpy,
    loadTasksSpy,
    validationSpy,
  };
};

describe('UpdateTask Controller', () => {
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

  it('should call UpdateTask with correct values', async () => {
    const { sut, updateTaskSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(updateTaskSpy.params).toEqual(httpRequest);
  });

  it('should return server error if UpdateTask throws', async () => {
    const { sut, updateTaskSpy } = makeSut();
    jest.spyOn(updateTaskSpy, 'update').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return forbidden if UpdateTask returns false', async () => {
    const { sut, updateTaskSpy } = makeSut();
    updateTaskSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('id')));
  });

  it('should call LoadTasks with correct userId', async () => {
    const { sut, loadTasksSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadTasksSpy.userId).toBe(httpRequest.userId);
  });

  it('should return server error if LoadTasks throws', async () => {
    const { sut, loadTasksSpy } = makeSut();
    jest.spyOn(loadTasksSpy, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return ok on success', async () => {
    const { sut, loadTasksSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(loadTasksSpy.tasks));
  });
});
