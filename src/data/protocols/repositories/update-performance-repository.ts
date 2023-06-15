import { UpdatePerformance } from '@/domain/usecases';

export interface UpdatePerformanceRepository {
  update: (
    data: UpdatePerformanceRepository.Params
  ) => Promise<UpdatePerformanceRepository.Result>;
}

export namespace UpdatePerformanceRepository {
  export type Params = {
    userId: string;
    minutesOfFocus: number;
    minutesOfRest: number;
    minutesOnImportantTasks: number;
    minutesOnUrgentTasks: number;
  };
  export type Result = UpdatePerformance.Result;
}
