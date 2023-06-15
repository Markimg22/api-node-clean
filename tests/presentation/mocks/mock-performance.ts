import { LoadPerformance, UpdatePerformance } from '@/domain/usecases';

import faker from '@faker-js/faker';

export class LoadPerformanceSpy implements LoadPerformance {
  userId: LoadPerformance.Params = faker.datatype.uuid();
  result: LoadPerformance.Result = {
    totalTimeOfFocus: String(faker.datatype.number()),
    totalTimeOfRest: String(faker.datatype.number()),
    totalTimeImportantTasks: String(faker.datatype.number()),
    totalTimeUrgentTasks: String(faker.datatype.number()),
    focusTimePercentage: faker.datatype.number(),
    percentageImportantTasks: faker.datatype.number(),
    percentageNotImportantTasks: faker.datatype.number(),
  };

  async load(userId: LoadPerformance.Params): Promise<LoadPerformance.Result> {
    this.userId = userId;
    return this.result;
  }
}

export class UpdatePerformanceSpy implements UpdatePerformance {
  params: UpdatePerformance.Params = {
    userId: faker.datatype.uuid(),
    totalTimeOfFocus: String(faker.datatype.number()),
    totalTimeOfRest: String(faker.datatype.number()),
    totalTimeImportantTasks: String(faker.datatype.number()),
    totalTimeUrgentTasks: String(faker.datatype.number()),
  };

  async update(
    params: UpdatePerformance.Params
  ): Promise<UpdatePerformance.Result> {
    this.params = params;
  }
}
