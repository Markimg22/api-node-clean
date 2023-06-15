import { MailProvider } from '@/data/protocols/mail';

import faker from '@faker-js/faker';

export class MailProviderSpy implements MailProvider {
  options: MailProvider.Options = {
    host: faker.datatype.string(),
    port: faker.datatype.number(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    from: faker.internet.email(),
    to: faker.internet.email(),
    html: faker.datatype.string(),
    text: faker.datatype.string(),
    subject: faker.datatype.string(),
  };
  result = true;

  async send(options: MailProvider.Options): Promise<MailProvider.Result> {
    this.options = options;
    return this.result;
  }
}
