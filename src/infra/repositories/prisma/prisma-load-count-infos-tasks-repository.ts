import { LoadCountInfosTasksRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadCountInfosTasksRepository
  implements LoadCountInfosTasksRepository
{
  constructor(private readonly client: PrismaClient) {}

  async load(
    userId: LoadCountInfosTasksRepository.Params
  ): Promise<LoadCountInfosTasksRepository.Result> {
    const [totalTasks, totalImportantTasks] = await Promise.all([
      this.client.task.count({
        where: { userId },
      }),
      this.client.task.count({
        where: { userId, important: true },
      }),
    ]);
    return {
      totalImportantTasks,
      totalNotImportantTasks: totalTasks - totalImportantTasks,
    };
  }
}
