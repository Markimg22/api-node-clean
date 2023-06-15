import { MailProvider } from '@/data/protocols/mail';
import { handlebarsAdapter } from '@/main/adapters';
import { env } from '@/main/config/env';

import path from 'path';

export const makeEmailWelcomeOptions = (): MailProvider.Options => {
  const from = `InfocusApp© | < ${env.mail.from} >`;
  const to = '';
  const html = '';
  return {
    host: env.mail.host,
    port: env.mail.port,
    username: env.mail.username,
    password: env.mail.password,
    to,
    from,
    subject: 'InfocusApp© | Welcome',
    text: 'Be very welcome!',
    html,
    template: handlebarsAdapter('welcome-email-template'),
    attachments: [
      {
        cid: 'logo',
        filename: 'logo.png',
        path: path.resolve(
          __dirname,
          '..',
          '..',
          'assets',
          'images',
          'logo.png'
        ),
      },
    ],
  };
};
