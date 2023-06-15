import { LoadUserByIdRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadUserByIdRepository implements LoadUserByIdRepository {
  constructor(private readonly client: PrismaClient) {}

  async load(
    userId: LoadUserByIdRepository.Params
  ): Promise<LoadUserByIdRepository.Result> {
    const user = await this.client.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
      },
    });
    return user;
  }
}
