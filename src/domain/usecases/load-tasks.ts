import { TaskModel } from '@/domain/models';

export interface LoadTasks {
  load: (userId: LoadTasks.Params) => Promise<LoadTasks.Result>;
}

export namespace LoadTasks {
  export type Params = string;
  export type Result = TaskModel[];
}
