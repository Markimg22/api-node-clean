import {
  CreateUserRepository,
  CheckUserByEmailRepository,
  LoadUserByEmailRepository,
  LoadUserByIdRepository,
  LoadUserByGoogleIdRepository,
} from '@/data/protocols/repositories';

import faker from '@faker-js/faker';

export class CheckUserByEmailRepositorySpy
  implements CheckUserByEmailRepository
{
  email = faker.internet.email();
  userExists = false;

  async check(
    email: CheckUserByEmailRepository.Params
  ): Promise<CheckUserByEmailRepository.Result> {
    this.email = email;
    return this.userExists;
  }
}

export class CreateUserRepositorySpy implements CreateUserRepository {
  data: CreateUserRepository.Params = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
    googleId: faker.datatype.uuid(),
  };
  user: CreateUserRepository.Result = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };
  callsCount = 0;

  async create(
    data: CreateUserRepository.Params
  ): Promise<CreateUserRepository.Result> {
    this.data = data;
    this.callsCount++;
    return this.user;
  }
}

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email = faker.internet.email();
  result: LoadUserByEmailRepository.Result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    googleId: faker.datatype.uuid(),
    avatarUrl: faker.internet.avatar(),
  };

  async load(email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class LoadUserByIdRepositorySpy implements LoadUserByIdRepository {
  userId: LoadUserByIdRepository.Params = faker.datatype.uuid();
  result: LoadUserByIdRepository.Result = {
    email: faker.internet.email(),
    name: faker.internet.userName(),
  };

  async load(
    userId: LoadUserByIdRepository.Params
  ): Promise<LoadUserByIdRepository.Result> {
    this.userId = userId;
    return this.result;
  }
}

export class LoadUserByGoogleIdRepositorySpy
  implements LoadUserByGoogleIdRepository
{
  googleId: LoadUserByGoogleIdRepository.Params = faker.datatype.uuid();
  result: LoadUserByGoogleIdRepository.Result = {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    avatarUrl: faker.internet.avatar(),
  };

  async load(
    googleId: LoadUserByGoogleIdRepository.Params
  ): Promise<LoadUserByGoogleIdRepository.Result> {
    this.googleId = googleId;
    return this.result;
  }
}
