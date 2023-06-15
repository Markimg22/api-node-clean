import { UpdatePerformanceController } from '@/presentation/controllers';
import { ok, serverError } from '@/presentation/helpers';

import {
  UpdatePerformanceSpy,
  LoadPerformanceSpy,
} from '@/tests/presentation/mocks';
import { mockUpdatePerformanceParams, throwError } from '@/tests/domain/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): UpdatePerformanceController.Request => {
  const updatePerformanceParams = mockUpdatePerformanceParams(
    faker.datatype.uuid()
  );
  return updatePerformanceParams;
};

type SutTypes = {
  sut: UpdatePerformanceController;
  updatePerformanceSpy: UpdatePerformanceSpy;
  loadPerformanceSpy: LoadPerformanceSpy;
};

const makeSut = (): SutTypes => {
  const updatePerformanceSpy = new UpdatePerformanceSpy();
  const loadPerformanceSpy = new LoadPerformanceSpy();
  const sut = new UpdatePerformanceController(
    updatePerformanceSpy,
    loadPerformanceSpy
  );
  return {
    sut,
    updatePerformanceSpy,
    loadPerformanceSpy,
  };
};

describe('UpdatePerformance Controller', () => {
  it('should call UpdatePerformance with correct values', async () => {
    const { sut, updatePerformanceSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(updatePerformanceSpy.params).toEqual(httpRequest);
  });

  it('should return server error if UpdatePerformance throws', async () => {
    const { sut, updatePerformanceSpy } = makeSut();
    jest
      .spyOn(updatePerformanceSpy, 'update')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should call LoadPerformance with correct userId', async () => {
    const { sut, loadPerformanceSpy } = makeSut();
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(loadPerformanceSpy.userId).toBe(httpRequest.userId);
  });

  it('should return server error if LoadPerformance throws', async () => {
    const { sut, loadPerformanceSpy } = makeSut();
    jest.spyOn(loadPerformanceSpy, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return ok on success', async () => {
    const { sut, loadPerformanceSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(ok(loadPerformanceSpy.result));
  });
});
