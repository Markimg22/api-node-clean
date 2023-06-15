import { UpdatePerformanceRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaUpdatePerformanceRepository
  implements UpdatePerformanceRepository
{
  constructor(private readonly client: PrismaClient) {}

  async update({
    userId,
    minutesOfFocus,
    minutesOfRest,
    minutesOnImportantTasks,
    minutesOnUrgentTasks,
  }: UpdatePerformanceRepository.Params): Promise<UpdatePerformanceRepository.Result> {
    await this.client.performance.update({
      where: { userId },
      data: {
        minutesOfFocus: {
          increment: minutesOfFocus,
        },
        minutesOfRest: {
          increment: minutesOfRest,
        },
        minutesOnImportantTasks: {
          increment: minutesOnImportantTasks,
        },
        minutesOnUrgentTasks: {
          increment: minutesOnUrgentTasks,
        },
      },
    });
  }
}
