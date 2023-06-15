import { Controller, HttpResponse, Services } from '@/presentation/protocols';
import { ok, serverError } from '@/presentation/helpers';
import { LoadPerformance, UpdatePerformance } from '@/domain/usecases';

export class UpdatePerformanceController implements Controller {
  constructor(
    private readonly updatePerformance: UpdatePerformance,
    private readonly loadPerformance: LoadPerformance
  ) {}

  async handle(
    request: UpdatePerformanceController.Request
  ): Promise<HttpResponse<UpdatePerformanceController.Response>> {
    try {
      await this.updatePerformance.update(request);
      const performanceUpdated = await this.loadPerformance.load(
        request.userId
      );
      return ok(performanceUpdated, Services.UPDATE_PERFORMANCE);
    } catch (error) {
      return serverError(error as Error, Services.UPDATE_PERFORMANCE);
    }
  }
}

export namespace UpdatePerformanceController {
  export type Request = UpdatePerformance.Params;
  export type Response = LoadPerformance.Result;
}
