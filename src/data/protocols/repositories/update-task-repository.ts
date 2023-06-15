import { UpdateTask } from '@/domain/usecases';

export interface UpdateTaskRepository {
  update: (
    data: UpdateTaskRepository.Params
  ) => Promise<UpdateTaskRepository.Result>;
}

export namespace UpdateTaskRepository {
  export type Params = UpdateTask.Params;
  export type Result = UpdateTask.Result;
}
