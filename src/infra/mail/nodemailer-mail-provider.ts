import { MailProvider } from '@/data/protocols/mail';
import { logger } from '@/utils/log';

import nodemailer from 'nodemailer';

export class NodemailerMailProvider implements MailProvider {
  async send(options: MailProvider.Options): Promise<MailProvider.Result> {
    try {
      const transporter = nodemailer.createTransport({
        host: options.host,
        port: options.port,
        auth: {
          user: options.username,
          pass: options.password,
        },
      });
      const result = await transporter.sendMail({
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments,
      });
      logger.info(`NodemailerMailProvider: E-mail send ${options}`);
      return result !== null;
    } catch (error) {
      logger.error(`NodemailerMailProvider: ${error}`);
      return false;
    }
  }
}
