import { DbUpdateTask } from '@/data/usecases';

import { mockUpdateTaskParams, throwError } from '@/tests/domain/mocks';
import { UpdateTaskRepositorySpy } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbUpdateTask;
  updateTaskRepositorySpy: UpdateTaskRepositorySpy;
};

const makeSut = (): SutTypes => {
  const updateTaskRepositorySpy = new UpdateTaskRepositorySpy();
  const sut = new DbUpdateTask(updateTaskRepositorySpy);
  return {
    sut,
    updateTaskRepositorySpy,
  };
};

describe('DbUpdateTask UseCase', () => {
  it('should call UpdateTaskRepository with correct values', async () => {
    const { sut, updateTaskRepositorySpy } = makeSut();
    const updateTaskParams = mockUpdateTaskParams('any_task_id', 'any_user_id');
    await sut.update(updateTaskParams);
    expect(updateTaskRepositorySpy.data).toEqual(updateTaskParams);
  });

  it('should throws if UpdateTaskRepository throws', async () => {
    const { sut, updateTaskRepositorySpy } = makeSut();
    jest
      .spyOn(updateTaskRepositorySpy, 'update')
      .mockImplementationOnce(throwError);
    const promise = sut.update(
      mockUpdateTaskParams('any_task_id', 'any_user_id')
    );
    await expect(promise).rejects.toThrow();
  });

  it('should return true if UpdateTaskRepository returns true', async () => {
    const { sut } = makeSut();
    const taskIsUpdated = await sut.update(
      mockUpdateTaskParams('any_task_id', 'any_user_id')
    );
    expect(taskIsUpdated).toBe(true);
  });

  it('should return false if UpdateTaskRepository returns false', async () => {
    const { sut, updateTaskRepositorySpy } = makeSut();
    updateTaskRepositorySpy.result = false;
    const taskIsUpdated = await sut.update(
      mockUpdateTaskParams('any_task_id', 'any_user_id')
    );
    expect(taskIsUpdated).toBe(false);
  });
});
