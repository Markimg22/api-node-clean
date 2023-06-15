import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpResponse,
  Services,
  TypeMail,
  Validation,
} from '@/presentation/protocols';
import { SendEmailError } from '@/presentation/errors';
import { SendEmailMessage } from '@/presentation/messages';
import { SendEmail } from '@/domain/usecases';

export class SendEmailController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly sendEmailWelcome: SendEmail
  ) {}

  async handle(
    request: SendEmailController.Request
  ): Promise<HttpResponse<SendEmailController.Response>> {
    try {
      const error = this.validation.validate(request);
      if (error) return badRequest(error, Services.SEND_EMAIL);
      let emailSent = false;
      switch (request.typeMail) {
        case TypeMail.WELCOME_MAIL:
          emailSent = await this.sendEmailWelcome.send(request.email);
          break;
        default:
      }
      if (!emailSent) {
        return forbidden(new SendEmailError());
      }
      return ok(new SendEmailMessage(request.email), Services.SEND_EMAIL);
    } catch (error) {
      return serverError(error as Error, Services.SEND_EMAIL);
    }
  }
}

export namespace SendEmailController {
  export type Request = {
    email: string;
    typeMail: TypeMail;
  };
  export type Response = {
    message: string;
  };
}
