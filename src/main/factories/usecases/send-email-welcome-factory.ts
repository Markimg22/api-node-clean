import { DbSendEmailWelcome } from '@/data/usecases';
import { SendEmail } from '@/domain/usecases';
import {
  makeMailProvider,
  makeEmailWelcomeOptions,
  makeRepositories,
} from '@/main/factories';

export const makeDbSendEmailWelcome = (): SendEmail => {
  const { loadUserByEmailRepository } = makeRepositories();
  return new DbSendEmailWelcome(
    makeEmailWelcomeOptions(),
    makeMailProvider(),
    loadUserByEmailRepository
  );
};
