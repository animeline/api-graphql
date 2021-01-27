import { container } from 'tsyringe';

import { BCryptHashProvider } from './HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from './HashProvider/models/IHashProvider';
import { JWTProvider } from './TokenProvider/implementations/JWTProvider';
import { ITokenProvider } from './TokenProvider/models/ITokenProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTProvider);
