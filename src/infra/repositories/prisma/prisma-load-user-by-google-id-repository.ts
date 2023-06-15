import { LoadUserByGoogleIdRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadUserByGoogleIdRepository
  implements LoadUserByGoogleIdRepository
{
  constructor(private readonly client: PrismaClient) {}
  async load(
    googleId: LoadUserByGoogleIdRepository.Params
  ): Promise<LoadUserByGoogleIdRepository.Result> {
    const user = await this.client.user.findUnique({
      where: { googleId },
    });
    if (!user) return null;
    return {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl || undefined,
    };
  }
}
