import { CreateUserRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaCreateUserRepository implements CreateUserRepository {
  constructor(private readonly client: PrismaClient) {}

  async create(
    data: CreateUserRepository.Params
  ): Promise<CreateUserRepository.Result> {
    const user = await this.client.user.create({
      data,
      select: {
        id: true,
        name: true,
        avatarUrl: true,
      },
    });
    return {
      ...user,
      avatarUrl: user.avatarUrl || undefined,
    };
  }
}
