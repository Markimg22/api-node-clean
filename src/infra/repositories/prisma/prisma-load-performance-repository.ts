import { LoadPerformanceRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadPerformanceRepository
  implements LoadPerformanceRepository
{
  constructor(private readonly client: PrismaClient) {}

  async load(
    userId: LoadPerformanceRepository.Params
  ): Promise<LoadPerformanceRepository.Result> {
    const performance = await this.client.performance.findUnique({
      where: { userId },
      select: {
        minutesOfFocus: true,
        minutesOfRest: true,
        minutesOnImportantTasks: true,
        minutesOnUrgentTasks: true,
      },
    });
    return performance ? { ...performance } : null;
  }
}
