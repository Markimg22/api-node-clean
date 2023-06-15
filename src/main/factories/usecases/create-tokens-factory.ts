import { DbCreateTokens } from '@/data/usecases';
import { JwtAdapter } from '@/infra/cryptography';

export const makeDbCreateTokens = (): DbCreateTokens => {
  const jwtAdapter = new JwtAdapter();
  return new DbCreateTokens(jwtAdapter);
};
