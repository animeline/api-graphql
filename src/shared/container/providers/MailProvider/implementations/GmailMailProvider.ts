import nodemailer from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import { mailConfig } from '@config';

import { IMailTemplateProvider } from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

import { ISendMailDTO } from '../dtos/ISendMailDTO';
import { IMailProvider } from '../models/IMailProvider';

@injectable()
export class GmailMailProvider implements IMailProvider {
  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const {
      driver,
      auth: { user, pass },
      defaults: {
        from: { name, email },
      },
    } = mailConfig;

    const transporter = nodemailer.createTransport({
      service: driver,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
