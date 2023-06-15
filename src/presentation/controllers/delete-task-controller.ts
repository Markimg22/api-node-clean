import {
  Controller,
  HttpResponse,
  Services,
  Validation,
} from '@/presentation/protocols';
import { DeleteTask, LoadTasks } from '@/domain/usecases';
import { serverError, ok, forbidden, badRequest } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';

export class DeleteTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteTask: DeleteTask,
    private readonly loadTasks: LoadTasks
  ) {}

  async handle(
    request: DeleteTaskController.Request
  ): Promise<HttpResponse<DeleteTaskController.Response>> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error);
      const taskDeleted = await this.deleteTask.delete(request);
      if (!taskDeleted)
        return forbidden(new InvalidParamError('id'), Services.DELETE_TASK);
      const tasks = await this.loadTasks.load(request.userId);
      return ok(tasks, Services.DELETE_TASK);
    } catch (error) {
      return serverError(error as Error, Services.DELETE_TASK);
    }
  }
}

export namespace DeleteTaskController {
  export type Request = {
    id: string;
    userId: string;
  };
  export type Response = LoadTasks.Result;
}
