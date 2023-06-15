import { DbLoadPerformance } from '@/data/usecases';

import { throwError } from '@/tests/domain/mocks';
import {
  LoadCountInfosTasksRepositorySpy,
  LoadPerformanceRepositorySpy,
} from '@/tests/data/mocks';
import {
  CalculationPercentageSpy,
  FormatMinutesToHourStringSpy,
} from '@/tests/utils/mocks';

import faker from '@faker-js/faker';

type SutTypes = {
  sut: DbLoadPerformance;
  loadPerformanceRepositorySpy: LoadPerformanceRepositorySpy;
  formatMinutesToHourStringSpy: FormatMinutesToHourStringSpy;
  calculationPercentageSpy: CalculationPercentageSpy;
  loadCountInfosTasksRepositorySpy: LoadCountInfosTasksRepositorySpy;
};

const makeSut = (): SutTypes => {
  const loadPerformanceRepositorySpy = new LoadPerformanceRepositorySpy();
  const calculationPercentageSpy = new CalculationPercentageSpy();
  const formatMinutesToHourStringSpy = new FormatMinutesToHourStringSpy();
  const loadCountInfosTasksRepositorySpy =
    new LoadCountInfosTasksRepositorySpy();
  const sut = new DbLoadPerformance(
    loadPerformanceRepositorySpy,
    loadCountInfosTasksRepositorySpy,
    formatMinutesToHourStringSpy,
    calculationPercentageSpy
  );
  return {
    sut,
    loadPerformanceRepositorySpy,
    formatMinutesToHourStringSpy,
    calculationPercentageSpy,
    loadCountInfosTasksRepositorySpy,
  };
};

describe('DbLoadPerformance UseCase', () => {
  it('should call LoadPerformanceRepository with correct userId', async () => {
    const { sut, loadPerformanceRepositorySpy } = makeSut();
    const userId = faker.datatype.uuid();
    await sut.load(userId);
    expect(loadPerformanceRepositorySpy.userId).toBe(userId);
  });

  it('should throw if LoadPerformanceRepository throws', async () => {
    const { sut, loadPerformanceRepositorySpy } = makeSut();
    jest
      .spyOn(loadPerformanceRepositorySpy, 'load')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('should return null if LoadPerformanceRepository returns null', async () => {
    const { sut, loadPerformanceRepositorySpy } = makeSut();
    loadPerformanceRepositorySpy.result = null;
    const userPerformance = await sut.load('any_id');
    expect(userPerformance).toBeNull();
  });

  it('should return user performance on success', async () => {
    const { sut } = makeSut();
    const userPerformance = await sut.load('any_id');
    expect(userPerformance).toBeTruthy();
  });

  it('should call FormatMinutesToHourString with correct values', async () => {
    const { sut, formatMinutesToHourStringSpy, loadPerformanceRepositorySpy } =
      makeSut();
    await sut.load('any_id');
    const performance = loadPerformanceRepositorySpy.result;
    expect(formatMinutesToHourStringSpy.params).toEqual([
      performance?.minutesOfFocus,
      performance?.minutesOfRest,
      performance?.minutesOnImportantTasks,
      performance?.minutesOnUrgentTasks,
    ]);
  });

  it('should throw if FormatMinutesToHourString throws', async () => {
    const { sut, formatMinutesToHourStringSpy } = makeSut();
    jest
      .spyOn(formatMinutesToHourStringSpy, 'format')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('should call CalculationPercentage with correct values', async () => {
    const {
      sut,
      loadPerformanceRepositorySpy,
      loadCountInfosTasksRepositorySpy,
      calculationPercentageSpy,
    } = makeSut();
    await sut.load('any_id');
    const performance = loadPerformanceRepositorySpy.result;
    const { totalImportantTasks, totalNotImportantTasks } =
      loadCountInfosTasksRepositorySpy.result;
    expect(calculationPercentageSpy.params).toEqual([
      {
        totalAmount:
          Number(performance?.minutesOfFocus) +
          Number(performance?.minutesOfRest),
        valueToFind: Number(performance?.minutesOfFocus),
      },
      {
        totalAmount: totalImportantTasks + totalNotImportantTasks,
        valueToFind: totalImportantTasks,
      },
    ]);
  });

  it('shoudl throw if CalculationPercentage throws', async () => {
    const { sut, calculationPercentageSpy } = makeSut();
    jest
      .spyOn(calculationPercentageSpy, 'calculate')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });

  it('should call LoadCountInfosTasksRepository with correct user id', async () => {
    const { sut, loadCountInfosTasksRepositorySpy } = makeSut();
    const userId = faker.datatype.uuid();
    await sut.load(userId);
    expect(loadCountInfosTasksRepositorySpy.userId).toBe(userId);
  });

  it('should throws if LoadCountInfosTasksRepository throws', async () => {
    const { sut, loadCountInfosTasksRepositorySpy } = makeSut();
    jest
      .spyOn(loadCountInfosTasksRepositorySpy, 'load')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });
});
