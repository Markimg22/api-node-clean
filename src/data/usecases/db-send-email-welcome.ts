import { MailProvider } from '@/data/protocols/mail';
import { SendEmail } from '@/domain/usecases';
import { LoadUserByEmailRepository } from '@/data/protocols/repositories';

export class DbSendEmailWelcome implements SendEmail {
  constructor(
    private readonly mailOptions: MailProvider.Options,
    private readonly mailProvider: MailProvider,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository
  ) {}

  async send(email: SendEmail.Params): Promise<SendEmail.Result> {
    const user = await this.loadUserByEmailRepository.load(email);
    if (!user) return false;
    const { template, ...rest } = this.mailOptions;
    const options: MailProvider.Options = {
      ...rest,
      to: `${user.name} < ${email} >`,
      html: template
        ? template({
            name: user.name,
          })
        : '',
    };
    const emailSent = await this.mailProvider.send(options);
    return emailSent;
  }
}
