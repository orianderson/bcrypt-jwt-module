import { DecodeOptions, JwtPayload } from "../types";

export interface IJwtService {
  checkToken(token: string, secret: string): Promise<JwtPayload | string>;
  createToken(
    payload: Object,
    options: { secret?: string; expiresIn?: string }
  ): Promise<string>;
  decodeToken(token: string, options: DecodeOptions): any;
}
