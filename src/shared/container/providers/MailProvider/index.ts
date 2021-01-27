import { container } from 'tsyringe';

import { GmailMailProvider } from './implementations/GmailMailProvider';
import { IMailProvider } from './models/IMailProvider';

const providers = {
  gmail: container.resolve(GmailMailProvider),
};

container.registerInstance<IMailProvider>('MailProvider', providers.gmail);
