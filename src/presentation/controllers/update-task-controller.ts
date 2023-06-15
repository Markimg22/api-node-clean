import {
  HttpResponse,
  Controller,
  Validation,
  Services,
} from '@/presentation/protocols';
import { LoadTasks, UpdateTask } from '@/domain/usecases';
import { serverError, ok, badRequest, forbidden } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';

export class UpdateTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly updateTask: UpdateTask,
    private readonly loadTasks: LoadTasks
  ) {}

  async handle(
    request: UpdateTaskController.Request
  ): Promise<HttpResponse<UpdateTaskController.Response>> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error, Services.UPDATE_TASK);
      const taskUpdated = await this.updateTask.update(request);
      if (!taskUpdated)
        return forbidden(new InvalidParamError('id'), Services.UPDATE_TASK);
      const { userId } = request;
      const tasks = await this.loadTasks.load(userId);
      return ok(tasks, Services.UPDATE_TASK);
    } catch (error) {
      return serverError(error as Error, Services.UPDATE_TASK);
    }
  }
}

export namespace UpdateTaskController {
  export type Request = UpdateTask.Params;
  export type Response = LoadTasks.Result;
}
