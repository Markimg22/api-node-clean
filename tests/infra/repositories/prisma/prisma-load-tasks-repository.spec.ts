import { PrismaLoadTasksRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import {
  mockCreateTaskParams,
  mockCreateTaskParamsWithOnlyRequiredParams,
  throwError,
} from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaLoadTasksRepository => {
  const sut = new PrismaLoadTasksRepository(client);
  return sut;
};

describe('PrismaLoadTasks Repository', () => {
  let user1: User;
  let user2: User;

  beforeAll(async () => {
    user1 = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
    user2 = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
    await Promise.all([
      client.task.createMany({
        data: [
          mockCreateTaskParams(user1.id),
          mockCreateTaskParams(user1.id),
          mockCreateTaskParams(user1.id),
          mockCreateTaskParams(user1.id),
        ],
      }),
      client.task.createMany({
        data: [
          mockCreateTaskParamsWithOnlyRequiredParams(user2.id),
          mockCreateTaskParamsWithOnlyRequiredParams(user2.id),
          mockCreateTaskParamsWithOnlyRequiredParams(user2.id),
          mockCreateTaskParamsWithOnlyRequiredParams(user2.id),
        ],
      }),
    ]);
  });

  afterAll(async () => {
    await client.task.deleteMany();
    await client.user.deleteMany();
  });

  it('should returns taks with correct userId', async () => {
    const sut = makeSut();
    const tasks = await client.task.findMany({
      where: { userId: user1.id },
      select: {
        id: true,
        emoji: true,
        title: true,
        description: true,
        completed: true,
        important: true,
        urgent: true,
        dailyTask: true,
        startDate: true,
        endDate: true,
      },
    });
    const loadTasksResult = await sut.load(user1.id);
    expect(loadTasksResult).toEqual(tasks);
  });

  it('should returns taks with correct userId', async () => {
    const sut = makeSut();
    const tasks = await client.task.findMany({
      where: { userId: user2.id },
      select: {
        id: true,
        title: true,
        completed: true,
        important: true,
        urgent: true,
        dailyTask: true,
      },
    });
    const loadTasksResult = await sut.load(user2.id);
    expect(loadTasksResult).toEqual(tasks);
  });

  it('should return empty array if not tasks', async () => {
    const sut = makeSut();
    const loadTasksResult = await sut.load('any_id');
    expect(loadTasksResult).toEqual([]);
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.task, 'findMany').mockImplementationOnce(throwError);
    const promise = sut.load('any_id');
    await expect(promise).rejects.toThrow();
  });
});
