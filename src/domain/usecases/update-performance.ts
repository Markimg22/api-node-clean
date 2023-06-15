export interface UpdatePerformance {
  update: (
    params: UpdatePerformance.Params
  ) => Promise<UpdatePerformance.Result>;
}

export namespace UpdatePerformance {
  export type Params = {
    userId: string;
    totalTimeOfFocus: string;
    totalTimeOfRest: string;
    totalTimeImportantTasks: string;
    totalTimeUrgentTasks: string;
  };
  export type Result = void;
}
