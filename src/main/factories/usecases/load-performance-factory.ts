import { DbLoadPerformance } from '@/data/usecases';
import { LoadPerformance } from '@/domain/usecases';
import {
  makeRepositories,
  makeMinutesToHourString,
  makeCalculationPercentage,
} from '@/main/factories';

export const makeDbLoadPerformance = (): LoadPerformance => {
  const { loadPerformanceRepository, loadCountInfosTasksRepository } =
    makeRepositories();
  return new DbLoadPerformance(
    loadPerformanceRepository,
    loadCountInfosTasksRepository,
    makeMinutesToHourString(),
    makeCalculationPercentage()
  );
};
