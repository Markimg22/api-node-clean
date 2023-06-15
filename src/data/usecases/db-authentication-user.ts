import { AuthenticationUser, CreateTokens } from '@/domain/usecases';
import { HttpClient } from '@/data/protocols/http';
import {
  CreateUserRepository,
  LoadUserByGoogleIdRepository,
} from '@/data/protocols/repositories';

export class DbAuthenticationUser implements AuthenticationUser {
  constructor(
    private readonly googleUserInfoUrl: string,
    private readonly httpClient: HttpClient<AuthenticationUser.UserInfoFromGoogle>,
    private readonly loadUserByGoogleIdRepository: LoadUserByGoogleIdRepository,
    private readonly createUserRepository: CreateUserRepository,
    private readonly createTokens: CreateTokens
  ) {}

  async auth(
    params: AuthenticationUser.Params
  ): Promise<AuthenticationUser.Result> {
    const userInfo = await this.httpClient.request({
      url: this.googleUserInfoUrl,
      method: 'get',
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });
    if (!userInfo.body) return null;
    const { id, name, email, picture } = userInfo.body;
    let user = await this.loadUserByGoogleIdRepository.load(id);
    if (!user) {
      user = await this.createUserRepository.create({
        name,
        email,
        googleId: id,
        avatarUrl: picture,
      });
    }
    const tokens = await this.createTokens.create({
      subject: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
    return { tokens, user };
  }
}
