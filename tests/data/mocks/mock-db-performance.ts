import {
  LoadPerformanceRepository,
  UpdatePerformanceRepository,
} from '@/data/protocols/repositories';

import faker from '@faker-js/faker';

export class LoadPerformanceRepositorySpy implements LoadPerformanceRepository {
  userId = faker.datatype.uuid();
  result: LoadPerformanceRepository.Result = {
    minutesOfFocus: faker.datatype.number(),
    minutesOfRest: faker.datatype.number(),
    minutesOnImportantTasks: faker.datatype.number(),
    minutesOnUrgentTasks: faker.datatype.number(),
  };

  async load(
    userId: LoadPerformanceRepository.Params
  ): Promise<LoadPerformanceRepository.Result> {
    this.userId = userId;
    return this.result;
  }
}

export class UpdatePerformanceRepositorySpy
  implements UpdatePerformanceRepository
{
  data: UpdatePerformanceRepository.Params = {
    userId: faker.datatype.uuid(),
    minutesOfFocus: faker.datatype.number(),
    minutesOfRest: faker.datatype.number(),
    minutesOnImportantTasks: faker.datatype.number(),
    minutesOnUrgentTasks: faker.datatype.number(),
  };

  async update(
    data: UpdatePerformanceRepository.Params
  ): Promise<UpdatePerformanceRepository.Result> {
    this.data = data;
  }
}
