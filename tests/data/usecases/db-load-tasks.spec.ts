import { DbLoadTasks } from '@/data/usecases';

import { throwError } from '@/tests/domain/mocks';
import { LoadTasksRepositorySpy } from '@/tests/data/mocks';
import { FormatDatetimeToFormattedDateSpy } from '@/tests/utils/mocks';

import faker from '@faker-js/faker';

jest.useFakeTimers().setSystemTime(new Date());

type SutTypes = {
  sut: DbLoadTasks;
  loadTasksRepositorySpy: LoadTasksRepositorySpy;
  formatDatetimeToFormattedDateSpy: FormatDatetimeToFormattedDateSpy;
};

const makeSut = (): SutTypes => {
  const loadTasksRepositorySpy = new LoadTasksRepositorySpy();
  const formatDatetimeToFormattedDateSpy =
    new FormatDatetimeToFormattedDateSpy();
  const sut = new DbLoadTasks(
    loadTasksRepositorySpy,
    formatDatetimeToFormattedDateSpy
  );
  return {
    sut,
    loadTasksRepositorySpy,
    formatDatetimeToFormattedDateSpy,
  };
};

describe('DbLoadTasks UseCase', () => {
  let userId: string;

  beforeAll(() => {
    userId = faker.datatype.uuid();
  });

  it('should call LoadTasksRepository with correct usuer id', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut();
    await sut.load(userId);
    expect(loadTasksRepositorySpy.userId).toBe(userId);
  });

  it('should throws if LoadTasksRepository throws', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut();
    jest
      .spyOn(loadTasksRepositorySpy, 'load')
      .mockImplementationOnce(throwError);
    const promise = sut.load(userId);
    await expect(promise).rejects.toThrow();
  });

  it('should return all tasks on success', async () => {
    const { sut, loadTasksRepositorySpy, formatDatetimeToFormattedDateSpy } =
      makeSut();
    const tasks = await sut.load(userId);
    expect(tasks).toEqual(
      loadTasksRepositorySpy.result.map((task) => {
        return {
          ...task,
          endDate: task.endDate
            ? formatDatetimeToFormattedDateSpy.format(task.endDate)
            : undefined,
          startDate: task.startDate
            ? formatDatetimeToFormattedDateSpy.format(task.startDate)
            : undefined,
        };
      })
    );
  });

  it('should return all tasks on success', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut();
    loadTasksRepositorySpy.withStartDateAndEndDate = false;
    const tasks = await sut.load(userId);
    expect(tasks).toEqual(
      loadTasksRepositorySpy.resultWithoutStartDateAndEndDate.map((task) => {
        return {
          ...task,
          startDate: undefined,
          endDate: undefined,
        };
      })
    );
  });

  it('should return empty list if LoadTasksRepository returns empty list', async () => {
    const { sut, loadTasksRepositorySpy } = makeSut();
    loadTasksRepositorySpy.result = [];
    const tasks = await sut.load(userId);
    expect(tasks).toEqual([]);
  });

  it('should call FormatDatetimeToFormattedDate with correct values', async () => {
    const { sut, formatDatetimeToFormattedDateSpy, loadTasksRepositorySpy } =
      makeSut();
    await sut.load(userId);
    const datesInTasks: Array<string | Date | undefined> = [];
    for (const task of loadTasksRepositorySpy.result) {
      datesInTasks.push(task.endDate);
      datesInTasks.push(task.startDate);
    }
    expect(formatDatetimeToFormattedDateSpy.params).toEqual(datesInTasks);
  });

  it('should throw if FormatDatetimeToFormattedDate throws', async () => {
    const { sut, formatDatetimeToFormattedDateSpy } = makeSut();
    jest
      .spyOn(formatDatetimeToFormattedDateSpy, 'format')
      .mockImplementationOnce(throwError);
    const promise = sut.load(userId);
    await expect(promise).rejects.toThrow();
  });
});
