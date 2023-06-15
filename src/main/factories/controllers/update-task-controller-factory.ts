import { UpdateTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import {
  makeDbLoadTasks,
  makeDbUpdateTask,
  makeUpdateTaskValidation,
} from '@/main/factories';

export const makeUpdateTaskController = (): Controller => {
  const controller = new UpdateTaskController(
    makeUpdateTaskValidation(),
    makeDbUpdateTask(),
    makeDbLoadTasks()
  );
  return controller;
};
