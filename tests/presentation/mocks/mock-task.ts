import {
  CreateTask,
  DeleteTask,
  LoadTasks,
  UpdateTask,
} from '@/domain/usecases';

import faker from '@faker-js/faker';

export class CreateTaskSpy implements CreateTask {
  params: CreateTask.Params = {
    userId: faker.datatype.uuid(),
    emoji: faker.internet.emoji(),
    title: faker.random.word(),
    description: faker.random.word(),
    dailyTask: faker.datatype.boolean(),
    important: faker.datatype.boolean(),
    urgent: faker.datatype.boolean(),
    startDate: faker.datatype.datetime(),
    endDate: faker.datatype.datetime(),
  };

  async create(params: CreateTask.Params): Promise<CreateTask.Result> {
    this.params = params;
  }
}

export class LoadTasksSpy implements LoadTasks {
  userId: LoadTasks.Params = faker.datatype.uuid();
  tasks: LoadTasks.Result = [
    {
      id: faker.datatype.uuid(),
      emoji: faker.internet.emoji(),
      title: faker.random.word(),
      description: faker.random.word(),
      completed: faker.datatype.boolean(),
      dailyTask: faker.datatype.boolean(),
      important: faker.datatype.boolean(),
      urgent: faker.datatype.boolean(),
      startDate: faker.datatype.datetime(),
      endDate: faker.datatype.datetime(),
    },
    {
      id: faker.datatype.uuid(),
      emoji: faker.internet.emoji(),
      title: faker.random.word(),
      description: faker.random.word(),
      completed: faker.datatype.boolean(),
      dailyTask: faker.datatype.boolean(),
      important: faker.datatype.boolean(),
      urgent: faker.datatype.boolean(),
      startDate: faker.datatype.datetime(),
      endDate: faker.datatype.datetime(),
    },
  ];

  async load(userId: LoadTasks.Params): Promise<LoadTasks.Result> {
    this.userId = userId;
    return this.tasks;
  }
}

export class UpdateTaskSpy implements UpdateTask {
  params: UpdateTask.Params = {
    id: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
  };
  result = true;

  async update(params: UpdateTask.Params): Promise<UpdateTask.Result> {
    this.params = params;
    return this.result;
  }
}

export class DeleteTaskSpy implements DeleteTask {
  params: DeleteTask.Params = {
    id: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
  };
  result = true;

  async delete(params: DeleteTask.Params): Promise<DeleteTask.Result> {
    this.params = params;
    return this.result;
  }
}
