import jwt from "jsonwebtoken";

import { IJwtService } from "../interfaces";
import { DecodeOptions, JwtPayload, Options } from "../@types";
import { jwtOptionsFields } from "./constants";
import {
  Either,
  left,
  right,
  ExpiredTokenError,
  InvalidOptionsError,
  InvalidSignatureError,
} from "../helpers";

export class JwtService implements IJwtService {
  private validadeOptions(options: Options): Either<InvalidOptionsError, true> {
    jwtOptionsFields.forEach((item) => {
      if (!options[item]) {
        return left(InvalidOptionsError);
      }
    });

    return right(true);
  }

  checkToken(
    token: string,
    secret: string
  ): Either<InvalidSignatureError | ExpiredTokenError, JwtPayload> {
    try {
      return right(jwt.verify(token, secret) as JwtPayload);
    } catch (err: any) {
      if (err.message === "invalid signature") {
        return left(new InvalidSignatureError());
      } else {
        return left(new ExpiredTokenError());
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
