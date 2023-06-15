import { DeleteTaskController } from '@/presentation/controllers';
import { serverError, ok, badRequest } from '@/presentation/helpers';

import { throwError } from '@/tests/domain/mocks';
import {
  LoadTasksSpy,
  DeleteTaskSpy,
  ValidationSpy,
} from '@/tests/presentation/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): DeleteTaskController.Request => ({
  id: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: DeleteTaskController;
  deleteTaskSpy: DeleteTaskSpy;
  loadTasksSpy: LoadTasksSpy;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const deleteTaskSpy = new DeleteTaskSpy();
  const loadTasksSpy = new LoadTasksSpy();
  const validationSpy = new ValidationSpy();
  const sut = new DeleteTaskController(
    validationSpy,
    deleteTaskSpy,
    loadTasksSpy
  );
  return {
    sut,
    deleteTaskSpy,
    loadTasksSpy,
    validationSpy,
  };
};

describe('DeleteTask Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validationSpy.input).toEqual(httpRequest);
  });

  it('should return bad request if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new Error();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  it('should server error if Validation throws', async () => {
    const { sut, validationSpy } = makeSut();
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call DeleteTask with correct values', async () => {
    const { sut, deleteTaskSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(deleteTaskSpy.params).toEqual(httpRequest);
  });

  it('should return server error if DeleteTask throws', async () => {
    const { sut, deleteTaskSpy } = makeSut();
    jest.spyOn(deleteTaskSpy, 'delete').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
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
