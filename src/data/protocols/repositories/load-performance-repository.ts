export interface LoadPerformanceRepository {
  load: (
    userId: LoadPerformanceRepository.Params
  ) => Promise<LoadPerformanceRepository.Result>;
}

export namespace LoadPerformanceRepository {
  export type Params = string;
  export type Result = {
    minutesOfFocus: number;
    minutesOfRest: number;
    minutesOnImportantTasks: number;
    minutesOnUrgentTasks: number;
  } | null;
}
