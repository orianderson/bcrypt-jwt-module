import { DecodeOptions, JwtPayload, Options } from "../@types";
import { Either, ExpiredTokenError, InvalidSignatureError } from "../helpers";

export interface IJwtService {
  checkToken(
    token: string,
    secret: string
  ): Either<InvalidSignatureError | ExpiredTokenError, JwtPayload>;
  createToken(payload: Object, options: Options): string | unknown;
  decodeToken(token: string, options: DecodeOptions): any;
}
