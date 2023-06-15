import { LoadTasksController } from '@/presentation/controllers';
import { serverError, ok } from '@/presentation/helpers';

import { throwError } from '@/tests/domain/mocks';
import { LoadTasksSpy } from '@/tests/presentation/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): LoadTasksController.Request => ({
  userId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: LoadTasksController;
  loadTasksSpy: LoadTasksSpy;
};

const makeSut = (): SutTypes => {
  const loadTasksSpy = new LoadTasksSpy();
  const sut = new LoadTasksController(loadTasksSpy);
  return {
    sut,
    loadTasksSpy,
  };
};

describe('LoadTasks Controller', () => {
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
