import { DecodeOptions, JwtPayload, Options } from "../types";

export interface IJwtService {
  checkToken(token: string, secret: string): JwtPayload | string;
  createToken(payload: Object, options: Options): Promise<string | unknown>;
  decodeToken(token: string, options: DecodeOptions): any;
}
