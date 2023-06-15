import { SendEmailController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';
import {
  makeSendEmailValidation,
  makeDbSendEmailWelcome,
} from '@/main/factories';

export const makeSendEmailController = (): Controller => {
  const controller = new SendEmailController(
    makeSendEmailValidation(),
    makeDbSendEmailWelcome()
  );
  return controller;
};
