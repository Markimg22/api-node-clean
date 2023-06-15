import { LoadPerformanceController } from '@/presentation/controllers';
import { ok, serverError } from '@/presentation/helpers';

import { throwError } from '@/tests/domain/mocks';
import { LoadPerformanceSpy } from '@/tests/presentation/mocks';

import faker from '@faker-js/faker';

const mockRequest = (): LoadPerformanceController.Request => ({
  userId: faker.datatype.uuid(),
});

type SutTypes = {
  sut: LoadPerformanceController;
  loadPerformanceSpy: LoadPerformanceSpy;
};

const makeSut = (): SutTypes => {
  const loadPerformanceSpy = new LoadPerformanceSpy();
  const sut = new LoadPerformanceController(loadPerformanceSpy);
  return {
    sut,
    loadPerformanceSpy,
  };
};

describe('LoadPerformance Controller', () => {
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
