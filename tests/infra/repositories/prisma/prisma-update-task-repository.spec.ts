import { PrismaUpdateTaskRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateTaskParams,
  mockUpdateTaskParams,
  throwError,
} from '@/tests/domain/mocks';

import { Task, User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaUpdateTaskRepository => {
  const sut = new PrismaUpdateTaskRepository(client);
  return sut;
};

describe('PrismaUpdateTask Repository', () => {
  let user: User;
  let task: Task;

  beforeAll(async () => {
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

  it('should update task with correct values', async () => {
    const sut = makeSut();
    const updateTaskParams = mockUpdateTaskParams(task.id, user.id);
    await sut.update(updateTaskParams);
    const taskUpdated = await client.task.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        userId: true,
        emoji: true,
        title: true,
        description: true,
        completed: true,
        dailyTask: true,
        important: true,
        urgent: true,
        startDate: true,
        endDate: true,
      },
    });
    expect(taskUpdated).toEqual(updateTaskParams);
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.task, 'updateMany').mockImplementationOnce(throwError);
    const promise = sut.update(
      mockUpdateTaskParams('any_task_id', 'any_user_id')
    );
    await expect(promise).rejects.toThrow();
  });

  it('should return true if updated succeds', async () => {
    const sut = makeSut();
    const taskIsUpdated = await sut.update(
      mockUpdateTaskParams(task.id, user.id)
    );
    expect(taskIsUpdated).toBe(true);
  });

  it('should return false if updated fails', async () => {
    const sut = makeSut();
    const taskIsUpdated = await sut.update(
      mockUpdateTaskParams('invalid_task_id', 'invalid_user_id')
    );
    expect(taskIsUpdated).toBe(false);
  });
});
