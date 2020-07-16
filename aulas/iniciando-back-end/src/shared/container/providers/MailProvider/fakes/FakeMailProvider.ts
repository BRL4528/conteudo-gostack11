import IMailProvider from '../models/IMailProvider';
import ISendMaiDTO from '../dtos/ISendMailDTOS';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMaiDTO[] = [];

  public async sendMail(message: ISendMaiDTO): Promise<void> {
    this.messages.push(message);
  }
}
