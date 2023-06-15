import { PrismaDeleteTaskRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import { mockCreateTaskParams, throwError } from '@/tests/domain/mocks';

import { Task, User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaDeleteTaskRepository => {
  const sut = new PrismaDeleteTaskRepository(client);
  return sut;
};

describe('PrismaDeleteTask Repository', () => {
  let user: User;
  let task: Task;

  beforeEach(async () => {
    user = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
    task = await client.task.create({
      data: mockCreateTaskParams(user.id),
    });
  });

  afterAll(async () => {
    await client.task.deleteMany();
    await client.user.deleteMany();
  });

  it('should return true if delete task on success', async () => {
    const sut = makeSut();
    const taskIsDeleted = await sut.delete({
      id: task.id,
      userId: user.id,
    });
    expect(taskIsDeleted).toBe(true);
  });

  it('should return false if client database receive invalid params', async () => {
    const sut = makeSut();
    const taskIsDeleted = await sut.delete({
      id: 'invalid_id',
      userId: 'any_user_id',
    });
    expect(taskIsDeleted).toBe(false);
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.task, 'deleteMany').mockImplementationOnce(throwError);
    const promise = sut.delete({ id: 'any_id', userId: 'any_id' });
    await expect(promise).rejects.toThrow();
  });
});
