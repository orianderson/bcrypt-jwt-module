import { UserId } from './../@types';

export interface IAuthService<T> {
  signInUser(password: string, secret: string, payload: T): Promise<T | false>;
  validadeRefreshToken(
    token: string,
    secret: string
  ): { accessToken: string | unknown } | false;
  validadeAccessToken(token: string, secret: string): UserId | false;
}
