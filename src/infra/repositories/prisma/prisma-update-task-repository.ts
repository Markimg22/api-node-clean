import { UpdateTaskRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaUpdateTaskRepository implements UpdateTaskRepository {
  constructor(private readonly client: PrismaClient) {}

  async update({
    id,
    userId,
    ...rest
  }: UpdateTaskRepository.Params): Promise<UpdateTaskRepository.Result> {
    const result = await this.client.task.updateMany({
      where: { id, userId },
      data: { ...rest },
    });
    return result.count !== 0;
  }
}
