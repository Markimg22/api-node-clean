import { CreateUser, AuthenticationUser } from '@/domain/usecases';

import faker from '@faker-js/faker';

export class CreateUserSpy implements CreateUser {
  params: CreateUser.Params = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    googleId: faker.datatype.uuid(),
    avatarUrl: faker.internet.avatar(),
  };
  result: CreateUser.Result = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };

  async create(params: CreateUser.Params): Promise<CreateUser.Result> {
    this.params = params;
    return this.result;
  }
}

export class AuthenticationUserSpy implements AuthenticationUser {
  params: AuthenticationUser.Params = {
    token: faker.datatype.uuid(),
  };
  result: AuthenticationUser.Result = {
    tokens: {
      accessToken: faker.datatype.uuid(),
      refreshToken: faker.datatype.uuid(),
    },
    user: {
      id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      avatarUrl: faker.internet.avatar(),
    },
  };

  async auth(
    params: AuthenticationUser.Params
  ): Promise<AuthenticationUser.Result> {
    this.params = params;
    return this.result;
  }
}
