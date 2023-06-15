import { forbidden, ok, serverError } from '@/presentation/helpers';
import { Middleware, HttpResponse, Services } from '@/presentation/protocols';
import { AccessDeniedError } from '@/presentation/errors';
import { Decrypter } from '@/data/protocols/cryptography';
import { env } from '@/main/config/env';

export class AuthMiddleware implements Middleware {
  constructor(private readonly decrypter: Decrypter) {}

  async handle(
    request: AuthMiddleware.Request
  ): Promise<HttpResponse<AuthMiddleware.Response>> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const descrypted = await this.decrypter.decrypt({
          cipherText: accessToken,
          secret: env.jwt.accessTokenSecret,
        });
        if (descrypted)
          return ok({ userId: descrypted.sub }, Services.AUTH_MIDDLEWARE);
      }
      return forbidden(new AccessDeniedError(), Services.AUTH_MIDDLEWARE);
    } catch (error) {
      return serverError(error as Error, Services.AUTH_MIDDLEWARE);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string;
  };
  export type Response = {
    userId: string;
  };
}
