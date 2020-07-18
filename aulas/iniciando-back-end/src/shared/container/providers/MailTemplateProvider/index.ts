import { container } from 'tsyringe';

import IMailTamplateProvider from './models/IMailTamplateProvider';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

const providers = {
  handlebars: HandlebarsMailTemplateProvider,
};

container.registerSingleton<IMailTamplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
);
