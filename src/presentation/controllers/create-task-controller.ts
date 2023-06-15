import { CreateTask, LoadTasks } from '@/domain/usecases';
import {
  Controller,
  Validation,
  HttpResponse,
  Services,
} from '@/presentation/protocols';
import { badRequest, serverError, ok } from '@/presentation/helpers';

export class CreateTaskController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly createTask: CreateTask,
    private readonly loadTasks: LoadTasks
  ) {}

  async handle(
    request: CreateTaskController.Request
  ): Promise<HttpResponse<CreateTaskController.Response>> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error, Services.CREATE_TASK);
      await this.createTask.create(request);
      const loadTasksResult = await this.loadTasks.load(request.userId);
      return ok(loadTasksResult, Services.CREATE_TASK);
    } catch (error) {
      return serverError(error as Error, Services.CREATE_TASK);
    }
  }
}

export namespace CreateTaskController {
  export type Request = CreateTask.Params;
  export type Response = LoadTasks.Result;
}
