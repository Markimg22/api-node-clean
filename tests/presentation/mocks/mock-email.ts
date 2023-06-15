import { SendEmail } from '@/domain/usecases';

import faker from '@faker-js/faker';

export class SendEmailWelcomeSpy implements SendEmail {
  email: SendEmail.Params = faker.internet.email();
  result = true;
  callsCount = 0;

  async send(email: SendEmail.Params): Promise<SendEmail.Result> {
    this.email = email;
    this.callsCount++;
    return this.result;
  }
}
