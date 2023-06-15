import { CheckUserByEmailRepository } from '@/data/protocols/repositories';

import { PrismaClient } from '@prisma/client';

export class PrismaCheckUserByEmailRepository
  implements CheckUserByEmailRepository
{
  constructor(private readonly client: PrismaClient) {}

  async check(
    email: CheckUserByEmailRepository.Params
  ): Promise<CheckUserByEmailRepository.Result> {
    const user = await this.client.user.findFirst({ where: { email } });
    return user !== null;
  }
}
