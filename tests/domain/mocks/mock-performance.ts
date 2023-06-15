import { UpdatePerformance } from '@/domain/usecases';

import faker from '@faker-js/faker';

export const mockUpdatePerformanceParams = (
  userId: string
): UpdatePerformance.Params => ({
  userId,
  totalTimeOfFocus: `${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}:${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}`,
  totalTimeOfRest: `${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}:${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}`,
  totalTimeImportantTasks: `${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}:${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}`,
  totalTimeUrgentTasks: `${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}:${String(
    faker.datatype.number({ max: 99, min: 0 })
  ).padStart(2, '0')}`,
});
