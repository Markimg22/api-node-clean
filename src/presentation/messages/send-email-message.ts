import { Message } from '@/presentation/protocols';

export class SendEmailMessage extends Message {
  constructor(email: string) {
    super(`Was sending an email to ${email}, check your spam box.`);
    this.name = 'ConfirmationEmailMessage';
  }
}
