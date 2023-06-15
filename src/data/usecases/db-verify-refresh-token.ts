import { VerifyRefreshToken } from '@/domain/usecases';
import { Decrypter } from '@/data/protocols/cryptography';
import { env } from '@/main/config/env';

export class DbVerifyRefreshToken implements VerifyRefreshToken {
  constructor(private decrypter: Decrypter) {}

  async verify(
    refreshToken: VerifyRefreshToken.Params
  ): Promise<VerifyRefreshToken.Result> {
    const userInfo = await this.decrypter.decrypt({
      cipherText: refreshToken,
      secret: env.jwt.refreshTokenSecret,
    });
    if (userInfo && userInfo.sub && userInfo.name) {
      return {
        id: userInfo.sub,
        name: userInfo.name,
        avatarUrl: userInfo.avatarUrl,
      };
    }
    return null;
  }
}
