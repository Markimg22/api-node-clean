import { LoadTasksRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadTasksRepository implements LoadTasksRepository {
  constructor(private readonly client: PrismaClient) {}

  async load(
    userId: LoadTasksRepository.Params
  ): Promise<LoadTasksRepository.Result> {
    const tasks = await this.client.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: {
        id: true,
        emoji: true,
        title: true,
        description: true,
        completed: true,
        important: true,
        dailyTask: true,
        urgent: true,
        startDate: true,
        endDate: true,
      },
    });
    return tasks.map((task) => {
      return {
        ...task,
        emoji: task.emoji || undefined,
        description: task.description || undefined,
        startDate: task.startDate || undefined,
        endDate: task.endDate || undefined,
      };
    });
  }
}
