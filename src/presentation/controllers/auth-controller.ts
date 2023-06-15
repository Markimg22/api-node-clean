import { HttpResponse, Services, Validation } from '@/presentation/protocols';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { AuthenticationUser } from '@/domain/usecases';
import { InvalidParamError } from '@/presentation/errors';

export class AuthController {
  constructor(
    private readonly validation: Validation,
    private readonly authenticationUser: AuthenticationUser
  ) {}

  async handle(
    request: AuthController.Request
  ): Promise<HttpResponse<AuthController.Response>> {
    try {
      const errorValidation = this.validation.validate(request);
      if (errorValidation) return badRequest(errorValidation, Services.AUTH);
      const userAuthenticated = await this.authenticationUser.auth({
        token: request.token,
      });
      if (!userAuthenticated)
        return forbidden(new InvalidParamError('token'), Services.AUTH);
      return ok(userAuthenticated, Services.AUTH);
    } catch (error) {
      return serverError(error as Error, Services.AUTH);
    }
  }
}

export namespace AuthController {
  export type Request = {
    token: string;
  };
  export type Response = AuthenticationUser.Result;
}
