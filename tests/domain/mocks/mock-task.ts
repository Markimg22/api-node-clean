import { CreateTask, UpdateTask, DeleteTask } from '@/domain/usecases';

import faker from '@faker-js/faker';

export const mockCreateTaskParams = (userId: string): CreateTask.Params => ({
  userId,
  emoji: faker.internet.emoji(),
  title: faker.random.word(),
  description: faker.random.word(),
  important: faker.datatype.boolean(),
  urgent: faker.datatype.boolean(),
  dailyTask: faker.datatype.boolean(),
  startDate: faker.datatype.datetime(),
  endDate: faker.datatype.datetime(),
});

export const mockCreateTaskParamsWithOnlyRequiredParams = (
  userId: string
): CreateTask.Params => ({
  userId,
  title: faker.random.word(),
  important: faker.datatype.boolean(),
  urgent: faker.datatype.boolean(),
  dailyTask: faker.datatype.boolean(),
});

export const mockUpdateTaskParams = (
  id: string,
  userId: string
): UpdateTask.Params => ({
  id,
  userId,
  completed: faker.datatype.boolean(),
  dailyTask: faker.datatype.boolean(),
  emoji: faker.internet.emoji(),
  title: faker.random.word(),
  description: faker.random.word(),
  important: faker.datatype.boolean(),
  urgent: faker.datatype.boolean(),
  startDate: faker.datatype.datetime(),
  endDate: faker.datatype.datetime(),
});

export const mockDeleteTaskParams = (): DeleteTask.Params => ({
  id: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
});
