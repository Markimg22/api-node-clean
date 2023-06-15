import { CreateTokens } from '@/domain/usecases';
import { Encrypter } from '@/data/protocols/cryptography';
import { env } from '@/main/config/env';

export class DbCreateTokens implements CreateTokens {
  constructor(private readonly encrypter: Encrypter) {}

  async create(params: CreateTokens.Params): Promise<CreateTokens.Result> {
    const { subject, name, avatarUrl } = params;
    const refreshToken = await this.encrypter.encrypt({
      payload: { name, avatarUrl },
      secret: env.jwt.refreshTokenSecret,
      expiresIn: env.jwt.refreshTokenExpiresIn,
      subject,
    });
    const accessToken = await this.encrypter.encrypt({
      payload: { name, avatarUrl },
      secret: env.jwt.accessTokenSecret,
      expiresIn: env.jwt.accessTokenExpiresIn,
      subject,
    });
    return { refreshToken, accessToken };
  }
}
