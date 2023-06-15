import { PrismaLoadCountInfosTasksRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateTaskParams,
  mockCreateUserParams,
  throwError,
} from '@/tests/domain/mocks';

import { User } from '@prisma/client';

const makeSut = (): PrismaLoadCountInfosTasksRepository => {
  const sut = new PrismaLoadCountInfosTasksRepository(client);
  return sut;
};

describe('PrismaLoadCountInfosTasks Repository', () => {
  let user: User;

  beforeAll(async () => {
    user = await client.user.create({
      data: mockCreateUserParams(),
    });
    await client.task.createMany({
      data: [
        mockCreateTaskParams(user.id),
        mockCreateTaskParams(user.id),
        mockCreateTaskParams(user.id),
        mockCreateTaskParams(user.id),
      ],
    });
  });

  afterAll(async () => {
    await client.task.deleteMany();
    await client.performance.deleteMany();
    await client.user.deleteMany();
  });

  it('should return count infos of tasks in success', async () => {
    const sut = makeSut();
    const countInfosTasks = await sut.load(user.id);
    const tasks = await client.task.findMany({
      where: { userId: user.id },
    });
    expect(countInfosTasks).toEqual({
      totalImportantTasks: tasks.filter((task) => task.important).length,
      totalNotImportantTasks: tasks.filter((task) => !task.important).length,
    });
  });

  it('should return values 0 if not exists tasks', async () => {
    const sut = makeSut();
    const countInfosTasks = await sut.load('any_id');
    expect(countInfosTasks).toEqual({
      totalImportantTasks: 0,
      totalNotImportantTasks: 0,
    });
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.task, 'count').mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });
});
