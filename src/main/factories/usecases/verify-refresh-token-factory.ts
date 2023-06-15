import { DbVerifyRefreshToken } from '@/data/usecases';
import { VerifyRefreshToken } from '@/domain/usecases';
import { JwtAdapter } from '@/infra/cryptography';

export const makeVerifyRefreshToken = (): VerifyRefreshToken => {
  const jwtAdapter = new JwtAdapter();
  return new DbVerifyRefreshToken(jwtAdapter);
};
