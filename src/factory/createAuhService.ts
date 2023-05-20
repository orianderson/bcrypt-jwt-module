import { AuthService } from '../services';
import { BcryptService, JwtService } from '../modules';
import { Payload } from '@src/@types';

/**
 * The function creates an instance of an authentication service using Bcrypt and JWT services.
 * @returns A new instance of `AuthService` class with `BcryptService` and `JwtService` instances
 * passed as arguments to its constructor. The generic type `Payload` is also specified for the
 * `AuthService` class.
 */
const createAuthService = () => {
  return new AuthService<Payload>(new BcryptService(), new JwtService());
};

export const authService = createAuthService();
