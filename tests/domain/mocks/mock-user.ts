import { CreateUser, AuthenticationUser } from '@/domain/usecases';

import faker from '@faker-js/faker';

export const mockCreateUserParams = (): CreateUser.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  googleId: faker.datatype.uuid(),
  avatarUrl: faker.internet.avatar(),
});

export const mockCreateUserParamsWithOnlyRequiredParams =
  (): CreateUser.Params => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    googleId: faker.datatype.uuid(),
  });

export const mockAuthenticationUserParams = (): AuthenticationUser.Params => ({
  token: faker.datatype.uuid(),
});

export const mockUserInfoFromGoogle =
  (): AuthenticationUser.UserInfoFromGoogle => ({
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    picture: faker.internet.avatar(),
  });
