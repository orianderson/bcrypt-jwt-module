export interface DecodeOptions {
  complete?: boolean | undefined;
  json?: boolean | undefined;
}

export interface JwtPayload {
  _id?: string;
  exp?: number | undefined;
}

export interface Payload {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface Options {
  secret: string;
  expiresIn: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}
