import { Controller, HttpResponse, Services } from '@/presentation/protocols';
import { serverError, ok } from '@/presentation/helpers';
import { LoadTasks } from '@/domain/usecases';

export class LoadTasksController implements Controller {
  constructor(private readonly loadTasks: LoadTasks) {}

  async handle(
    request: LoadTasksController.Request
  ): Promise<HttpResponse<LoadTasksController.Response>> {
    try {
      const tasks = await this.loadTasks.load(request.userId);
      return ok(tasks, Services.LOAD_TASKS);
    } catch (error) {
      return serverError(error as Error, Services.LOAD_TASKS);
    }
  }
}

export namespace LoadTasksController {
  export type Request = {
    userId: string;
  };
  export type Response = LoadTasks.Result;
}
