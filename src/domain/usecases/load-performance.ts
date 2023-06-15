export interface LoadPerformance {
  load: (userId: LoadPerformance.Params) => Promise<LoadPerformance.Result>;
}

export namespace LoadPerformance {
  export type Params = string;
  export type Result = {
    totalTimeOfFocus: string;
    totalTimeOfRest: string;
    totalTimeImportantTasks: string;
    totalTimeUrgentTasks: string;
    focusTimePercentage: number;
    percentageImportantTasks: number;
    percentageNotImportantTasks: number;
  } | null;
}
