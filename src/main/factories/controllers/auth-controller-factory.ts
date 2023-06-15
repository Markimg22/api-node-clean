import { AuthController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import { makeAuthValidation, makeDbAuthenticationUser } from '@/main/factories';

export const makeAuthController = (): Controller => {
  const controller = new AuthController(
    makeAuthValidation(),
    makeDbAuthenticationUser()
  );
  return controller;
};
