import jwt from "jsonwebtoken";

import { IJwtService } from "../interfaces";
import { DecodeOptions, JwtPayload, Options } from "../types";

export class JwtService implements IJwtService {
  checkToken(token: string, secret: string): JwtPayload | string {
    try {
      return jwt.verify(token, secret);
    } catch (err: any) {
      return err.message;
    }
  }

  async createToken(
    payload: Object,
    options: Options
  ): Promise<string | unknown> {
    const token = jwt.sign(payload, options.secret, {
      expiresIn: options.expiresIn,
    });

    return token;
  }

  decodeToken(token: string, options: DecodeOptions) {
    return jwt.decode(token, options);
  }
}
