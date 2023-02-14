import jwt from "jsonwebtoken";

import { IJwtService } from "../interfaces";
import { DecodeOptions, JwtPayload } from "../types";
import { Replace } from "../utils";

interface Options {
  secret?: string;
  expiresIn?: string;
}

export class JwtService implements IJwtService {
  async checkToken(
    token: string,
    secret: string
  ): Promise<JwtPayload | string> {
    return new Promise((resolve, reject) =>
      jwt.verify(token, secret, (err, decoded) =>
        err ? reject(err) : resolve(decoded)
      )
    );
  }

  async createToken(
    payload: Object,
    options: Replace<Options, { secret: "secret"; expiresIn: "1m" }>
  ): Promise<string> {
    return new Promise((resolve, reject) =>
      jwt.sign(
        payload,
        options.secret,
        { expiresIn: options.expiresIn },
        (err, encoded) => (err ? reject(err) : resolve(encoded))
      )
    );
  }

  decodeToken(token: string, options: DecodeOptions) {
    return jwt.decode(token, options);
  }
}
