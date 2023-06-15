import { DbUpdatePerformance } from '@/data/usecases';
import { UpdatePerformance } from '@/domain/usecases';
import {
  makeRepositories,
  makeFormatHourStringToMinutes,
} from '@/main/factories';

export const makeDbUpdatePerformance = (): UpdatePerformance => {
  const { updatePerformanceRepository } = makeRepositories();
  return new DbUpdatePerformance(
    updatePerformanceRepository,
    makeFormatHourStringToMinutes()
  );
};
