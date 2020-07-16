import IMailTemplateProvider from '../models/IMailTamplateProvider';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}

export default FakeMailTemplateProvider;
