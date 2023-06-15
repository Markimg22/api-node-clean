import { DbUpdatePerformance } from '@/data/usecases';

import { mockUpdatePerformanceParams, throwError } from '@/tests/domain/mocks';
import { UpdatePerformanceRepositorySpy } from '@/tests/data/mocks';
import { FormatHourStringToMinutesSpy } from '@/tests/utils/mocks';

type SutTypes = {
  sut: DbUpdatePerformance;
  updatePerformanceRepositorySpy: UpdatePerformanceRepositorySpy;
  formatHourStringToMinutesSpy: FormatHourStringToMinutesSpy;
};

const makeSut = (): SutTypes => {
  const updatePerformanceRepositorySpy = new UpdatePerformanceRepositorySpy();
  const formatHourStringToMinutesSpy = new FormatHourStringToMinutesSpy();
  const sut = new DbUpdatePerformance(
    updatePerformanceRepositorySpy,
    formatHourStringToMinutesSpy
  );
  return {
    sut,
    updatePerformanceRepositorySpy,
    formatHourStringToMinutesSpy,
  };
};

describe('DbUpdatePerformance UseCase', () => {
  it('should call UpdatePerformanceRepository with correct values', async () => {
    const {
      sut,
      updatePerformanceRepositorySpy,
      formatHourStringToMinutesSpy,
    } = makeSut();
    const updatePerformanceParams = mockUpdatePerformanceParams('any_id');
    await sut.update(updatePerformanceParams);
    const {
      userId,
      totalTimeOfFocus,
      totalTimeOfRest,
      totalTimeImportantTasks,
      totalTimeUrgentTasks,
    } = updatePerformanceParams;
    expect(updatePerformanceRepositorySpy.data).toEqual({
      userId,
      minutesOfFocus: formatHourStringToMinutesSpy.format(totalTimeOfFocus),
      minutesOfRest: formatHourStringToMinutesSpy.format(totalTimeOfRest),
      minutesOnImportantTasks: formatHourStringToMinutesSpy.format(
        totalTimeImportantTasks
      ),
      minutesOnUrgentTasks:
        formatHourStringToMinutesSpy.format(totalTimeUrgentTasks),
    });
  });

  it('should throws if UpdatePerformanceRepository throws', async () => {
    const { sut, updatePerformanceRepositorySpy } = makeSut();
    jest
      .spyOn(updatePerformanceRepositorySpy, 'update')
      .mockImplementationOnce(throwError);
    const promise = sut.update(mockUpdatePerformanceParams('any_id'));
    await expect(promise).rejects.toThrow();
  });

  it('should call FormatHourStringToMinutes with correct values', async () => {
    const { sut, formatHourStringToMinutesSpy } = makeSut();
    const updatePerformanceParams = mockUpdatePerformanceParams('any_id');
    await sut.update(updatePerformanceParams);
    const {
      totalTimeOfFocus,
      totalTimeOfRest,
      totalTimeImportantTasks,
      totalTimeUrgentTasks,
    } = updatePerformanceParams;
    expect(formatHourStringToMinutesSpy.params).toEqual([
      totalTimeOfFocus,
      totalTimeOfRest,
      totalTimeImportantTasks,
      totalTimeUrgentTasks,
    ]);
  });
});
