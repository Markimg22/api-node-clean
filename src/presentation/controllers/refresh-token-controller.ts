import {
  Controller,
  HttpResponse,
  Services,
  Validation,
} from '@/presentation/protocols';
import { CreateTokens, VerifyRefreshToken } from '@/domain/usecases';
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import { InvalidParamError } from '@/presentation/errors';
import { UserModel } from '@/domain/models';

export class RefreshTokenController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly verifyRefreshToken: VerifyRefreshToken,
    private readonly createTokens: CreateTokens
  ) {}

  async handle(
    request: RefreshTokenController.Request
  ): Promise<HttpResponse<RefreshTokenController.Response>> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error, Services.REFRESH_TOKEN);
      const { refreshToken } = request;
      const userInfos = await this.verifyRefreshToken.verify(refreshToken);
      if (!userInfos)
        return forbidden(
          new InvalidParamError('refreshToken'),
          Services.REFRESH_TOKEN
        );
      const { id, name, avatarUrl } = userInfos;
      const tokens = await this.createTokens.create({
        name,
        avatarUrl,
        subject: id,
      });
      return ok(
        {
          tokens,
          user: { id, name, avatarUrl },
        },
        Services.REFRESH_TOKEN
      );
    } catch (error) {
      return serverError(error as Error, Services.REFRESH_TOKEN);
    }
  }
}

export namespace RefreshTokenController {
  export type Request = {
    refreshToken: string;
  };
  export type Response = {
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
    user: UserModel;
  };
}
