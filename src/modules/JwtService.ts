import jwt from "jsonwebtoken";

import { IJwtService } from "../interfaces";
import { DecodeOptions, JwtPayload, Options } from "../@types";
import { jwtOptionsFields } from "./constants";

export class JwtService implements IJwtService {
  private validadeOptions(options: Options) {
    jwtOptionsFields.forEach((item) => {
      if (!options[item]) {
        throw new Error("invalid options");
      }
    });
  }

  checkToken(token: string, secret: string): JwtPayload | string {
    try {
      return jwt.verify(token, secret);
    } catch (err: any) {
      if (err.message === "invalid signature") {
        throw new Error("invalid signature");
      } else {
        throw new Error("json web token expired");
      }
    }
  }

  createToken(payload: Object, options: Options): string | unknown {
    this.validadeOptions(options);

    const token = jwt.sign(payload, options.secret, {
      expiresIn: options.expiresIn,
    });

    return token;
  }

  decodeToken(token: string, options: DecodeOptions) {
    return jwt.decode(token, options);
  }
}
