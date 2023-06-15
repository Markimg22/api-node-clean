import { DbCreateUser } from '@/data/usecases';
import { CreateUser } from '@/domain/usecases';
import { makeRepositories } from '@/main/factories';

export const makeDbCreateUser = (): CreateUser => {
  const { checkUserByEmailRepository, createUserRepository } =
    makeRepositories();
  return new DbCreateUser(checkUserByEmailRepository, createUserRepository);
};
