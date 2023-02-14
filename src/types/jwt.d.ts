export interface DecodeOptions {
  complete?: boolean | undefined;
  json?: boolean | undefined;
}

export interface JwtPayload {
  _id?: string;
  exp?: number | undefined;
}

export interface Options {
  secret: string;
  expiresIn?: string;
}
