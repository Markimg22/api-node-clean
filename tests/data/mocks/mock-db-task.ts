import {
  CreateTaskRepository,
  LoadTasksRepository,
  UpdateTaskRepository,
  DeleteTaskRepository,
  LoadCountInfosTasksRepository,
} from '@/data/protocols/repositories';

import faker from '@faker-js/faker';

export class CreateTaskRepositorySpy implements CreateTaskRepository {
  data: CreateTaskRepository.Params = {
    userId: faker.datatype.uuid(),
    emoji: faker.internet.emoji(),
    title: faker.random.word(),
    description: faker.random.word(),
    important: faker.datatype.boolean(),
    urgent: faker.datatype.boolean(),
    dailyTask: faker.datatype.boolean(),
    startDate: faker.datatype.datetime(),
    endDate: faker.datatype.datetime(),
  };

  async create(
    data: CreateTaskRepository.Params
  ): Promise<CreateTaskRepository.Result> {
    this.data = data;
  }
}

export class LoadTasksRepositorySpy implements LoadTasksRepository {
  userId = faker.datatype.uuid();
  withStartDateAndEndDate: boolean = true;
  result: LoadTasksRepository.Result = [
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
  resultWithoutStartDateAndEndDate: LoadTasksRepository.Result = [
    {
      id: faker.datatype.uuid(),
      emoji: faker.internet.emoji(),
      title: faker.random.word(),
      description: faker.random.word(),
      completed: faker.datatype.boolean(),
      dailyTask: faker.datatype.boolean(),
      important: faker.datatype.boolean(),
      urgent: faker.datatype.boolean(),
    },
  ];

  async load(
    userId: LoadTasksRepository.Params
  ): Promise<LoadTasksRepository.Result> {
    this.userId = userId;
    if (this.withStartDateAndEndDate) return this.result;
    return this.resultWithoutStartDateAndEndDate;
  }
}

export class UpdateTaskRepositorySpy implements UpdateTaskRepository {
  data: UpdateTaskRepository.Params = {
    userId: faker.datatype.uuid(),
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
  };
  result = true;

  async update(
    data: UpdateTaskRepository.Params
  ): Promise<UpdateTaskRepository.Result> {
    this.data = data;
    return this.result;
  }
}

export class DeleteTaskRepositorySpy implements DeleteTaskRepository {
  data: DeleteTaskRepository.Params = {
    id: faker.datatype.uuid(),
    userId: faker.datatype.uuid(),
  };
  result = true;

  async delete(
    data: DeleteTaskRepository.Params
  ): Promise<DeleteTaskRepository.Result> {
    this.data = data;
    return this.result;
  }
}

export class LoadCountInfosTasksRepositorySpy
  implements LoadCountInfosTasksRepository
{
  userId = faker.datatype.uuid();
  result: LoadCountInfosTasksRepository.Result = {
    totalImportantTasks: faker.datatype.number(),
    totalNotImportantTasks: faker.datatype.number(),
  };

  async load(
    userId: LoadCountInfosTasksRepository.Params
  ): Promise<LoadCountInfosTasksRepository.Result> {
    this.userId = userId;
    return this.result;
  }
}
