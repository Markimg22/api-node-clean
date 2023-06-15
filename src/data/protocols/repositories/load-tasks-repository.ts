import { LoadTasks } from '@/domain/usecases';

export interface LoadTasksRepository {
  load: (
    userId: LoadTasksRepository.Params
  ) => Promise<LoadTasksRepository.Result>;
}

export namespace LoadTasksRepository {
  export type Params = string;
  export type Result = LoadTasks.Result;
}
