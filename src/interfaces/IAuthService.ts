import { Payload, UserResponse, UserId } from "./../@types";

export interface IAuthService {
  signInUser(
    password: string,
    secret: string,
    payload: Payload
  ): Promise<UserResponse | false>;
  validadeRefreshToken(
    token: string,
    secret: string
  ): { accessToken: string | unknown } | false;
  validadeAccessToken(token: string, secret: string): UserId | false;
}
