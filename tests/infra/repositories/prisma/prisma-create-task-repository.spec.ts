import { PrismaCreateTaskRepository } from '@/infra/repositories';
import { client } from '@/infra/helpers';

import { mockCreateTaskParams, throwError } from '@/tests/domain/mocks';

import { User } from '@prisma/client';
import faker from '@faker-js/faker';

const makeSut = (): PrismaCreateTaskRepository => {
  const sut = new PrismaCreateTaskRepository(client);
  return sut;
};

describe('PrismaCreateTask Repository', () => {
  let user: User;

  beforeAll(async () => {
    user = await client.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.internet.userName(),
        googleId: faker.datatype.uuid(),
      },
    });
  });

  afterAll(async () => {
    await client.performance.deleteMany();
    await client.task.deleteMany();
    await client.user.deleteMany();
  });

  it('should create task with correct values', async () => {
    const sut = makeSut();
    const createTaskParams = mockCreateTaskParams(user.id);
    await sut.create(createTaskParams);
    const task = await client.task.findFirst({ where: { userId: user.id } });
    expect(task).toEqual({
      userId: user.id,
      id: expect.any(String),
      emoji: createTaskParams.emoji,
      title: createTaskParams.title,
      description: createTaskParams.description,
      completed: false,
      important: createTaskParams.important,
      urgent: createTaskParams.urgent,
      dailyTask: createTaskParams.dailyTask,
      startDate: createTaskParams.startDate,
      endDate: createTaskParams.endDate,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should throws if client database throws', async () => {
    const sut = makeSut();
    jest.spyOn(client.task, 'create').mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateTaskParams(user.id));
    await expect(promise).rejects.toThrow();
  });
});
