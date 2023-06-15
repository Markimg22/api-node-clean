import { DbAuthenticationUser } from '@/data/usecases';
import { AuthenticationUser } from '@/domain/usecases';
import { env } from '@/main/config/env';
import {
  makeRepositories,
  makeHttpClient,
  makeDbCreateTokens,
} from '@/main/factories';

export const makeDbAuthenticationUser = (): AuthenticationUser => {
  const { loadUserByGoogleIdRepository, createUserRepository } =
    makeRepositories();
  return new DbAuthenticationUser(
    env.google.userInfoUrl,
    makeHttpClient(),
    loadUserByGoogleIdRepository,
    createUserRepository,
    makeDbCreateTokens()
  );
};
