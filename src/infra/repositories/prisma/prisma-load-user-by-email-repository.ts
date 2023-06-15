import { LoadUserByEmailRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaLoadUserByEmailRepository
  implements LoadUserByEmailRepository
{
  constructor(private readonly client: PrismaClient) {}

  async load(
    email: LoadUserByEmailRepository.Params
  ): Promise<LoadUserByEmailRepository.Result> {
    const user = await this.client.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        googleId: true,
        avatarUrl: true,
      },
    });
    if (!user) return null;
    return {
      ...user,
      avatarUrl: user.avatarUrl || undefined,
    };
  }
}
