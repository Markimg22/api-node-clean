import { AuthMiddleware } from '@/presentation/middlewares';
import { Middleware } from '@/presentation/protocols';
import { JwtAdapter } from '@/infra/cryptography';

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JwtAdapter();
  return new AuthMiddleware(jwtAdapter);
};
