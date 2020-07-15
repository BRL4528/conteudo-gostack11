
import nodemailer, { Transporter } from  'nodemailer';
import IMailProvider from '../models/IMailProvider';
import ISendMaiDTO from '../dtos/ISendMailDTOS';
import routes from '@shared/infra/http/routes';


export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAcount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smttp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })
      this.client = transporter;
    })

  }

  public async sendMail({ to, from,  subject }: ISendMaiDTO): Promise<void> {
  const message =  await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      text: "teste",
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
