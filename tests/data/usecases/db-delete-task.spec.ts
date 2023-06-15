import { DbDeleteTask } from '@/data/usecases';

import { throwError, mockDeleteTaskParams } from '@/tests/domain/mocks';
import { DeleteTaskRepositorySpy } from '@/tests/data/mocks';

type SutTypes = {
  sut: DbDeleteTask;
  deleteTaskRepositorySpy: DeleteTaskRepositorySpy;
};

const makeSut = (): SutTypes => {
  const deleteTaskRepositorySpy = new DeleteTaskRepositorySpy();
  const sut = new DbDeleteTask(deleteTaskRepositorySpy);
  return {
    sut,
    deleteTaskRepositorySpy,
  };
};

describe('DbDeleteTask UseCase', () => {
  it('should call DeleteTaskRepository with correct values', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut();
    const deleteTaskParams = mockDeleteTaskParams();
    await sut.delete(deleteTaskParams);
    expect(deleteTaskRepositorySpy.data).toEqual(deleteTaskParams);
  });

  it('should throws if DeleteTaskRepository throws', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut();
    jest
      .spyOn(deleteTaskRepositorySpy, 'delete')
      .mockImplementationOnce(throwError);
    const promise = sut.delete(mockDeleteTaskParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return true if DeleteTaskRepository returns true', async () => {
    const { sut } = makeSut();
    const taskIsDeleted = await sut.delete(mockDeleteTaskParams());
    expect(taskIsDeleted).toBe(true);
  });

  it('should return false if DeleteTaskRepositoru returns false', async () => {
    const { sut, deleteTaskRepositorySpy } = makeSut();
    deleteTaskRepositorySpy.result = false;
    const taskIsDeleted = await sut.delete(mockDeleteTaskParams());
    expect(taskIsDeleted).toBe(false);
  });
});
