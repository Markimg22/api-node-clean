import { DeleteTaskController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import {
  makeDbDeleteTask,
  makeDbLoadTasks,
  makeDeleteTaskValidation,
} from '@/main/factories';

export const makeDeleteTaskController = (): Controller => {
  const controller = new DeleteTaskController(
    makeDeleteTaskValidation(),
    makeDbDeleteTask(),
    makeDbLoadTasks()
  );
  return controller;
};
