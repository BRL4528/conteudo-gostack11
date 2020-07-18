// import nodemailer, { Transporter } from 'nodemailer/lib/ses-transport';
import { injectable, inject } from 'tsyringe';

import IMailProvider from '../models/IMailProvider';
import ISendMaiDTO from '../dtos/ISendMailDTOS';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTamplateProvider';

@injectable()
export default class SESMailProvider implements IMailProvider {
  // private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {}

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMaiDTO): Promise<void> {
    console.log('Funcionou');
  }
}
