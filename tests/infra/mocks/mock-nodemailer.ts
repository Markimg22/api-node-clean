import nodemailer from 'nodemailer';

export const mockNodemailer = (): jest.Mocked<typeof nodemailer> => {
  const mockedNodemailer = nodemailer as jest.Mocked<typeof nodemailer>;
  const sendMailMock = jest.fn().mockReturnValueOnce({});
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mockedNodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });
  return mockedNodemailer;
};
