export interface LoadCountInfosTasksRepository {
  load: (
    userId: LoadCountInfosTasksRepository.Params
  ) => Promise<LoadCountInfosTasksRepository.Result>;
}

export namespace LoadCountInfosTasksRepository {
  export type Params = string;
  export type Result = {
    totalImportantTasks: number;
    totalNotImportantTasks: number;
  };
}
