import { RefreshTokenController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import {
  makeRefreshTokenValidation,
  makeVerifyRefreshToken,
  makeDbCreateTokens,
} from '@/main/factories';

export const makeRefreshTokenController = (): Controller => {
  const controller = new RefreshTokenController(
    makeRefreshTokenValidation(),
    makeVerifyRefreshToken(),
    makeDbCreateTokens()
  );
  return controller;
};
