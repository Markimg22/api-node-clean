import { Controller, HttpResponse, Services } from '@/presentation/protocols';
import { notFound, ok, serverError } from '@/presentation/helpers';
import { LoadPerformance } from '@/domain/usecases';

export class LoadPerformanceController implements Controller {
  constructor(private readonly loadPerformance: LoadPerformance) {}

  async handle(
    request: LoadPerformanceController.Request
  ): Promise<HttpResponse<LoadPerformanceController.Response>> {
    try {
      const performance = await this.loadPerformance.load(request.userId);
      if (!performance) return notFound(Services.LOAD_PERFORMANCE);
      return ok(performance, Services.LOAD_PERFORMANCE);
    } catch (error) {
      return serverError(error as Error, Services.LOAD_PERFORMANCE);
    }
  }
}

export namespace LoadPerformanceController {
  export type Request = {
    userId: string;
  };
  export type Response = LoadPerformance.Result;
}
