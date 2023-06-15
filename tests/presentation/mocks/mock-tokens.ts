import { CreateTokens, VerifyRefreshToken } from '@/domain/usecases';

import faker from '@faker-js/faker';

export class CreateTokensSpy implements CreateTokens {
  params: CreateTokens.Params = {
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
    subject: faker.datatype.uuid(),
  };
  result: CreateTokens.Result = {
    refreshToken: faker.datatype.uuid(),
    accessToken: faker.datatype.uuid(),
  };

  async create(params: CreateTokens.Params): Promise<CreateTokens.Result> {
    this.params = params;
    return this.result;
  }
}

export class VerifyRefreshTokenSpy implements VerifyRefreshToken {
  refreshToken = faker.datatype.uuid();
  result: VerifyRefreshToken.Result = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };

  async verify(
    refreshToken: VerifyRefreshToken.Params
  ): Promise<VerifyRefreshToken.Result> {
    this.refreshToken = refreshToken;
    return this.result;
  }
}
