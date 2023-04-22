export interface DecodeOptions {
  complete?: boolean | undefined;
  json?: boolean | undefined;
}

export interface JwtPayload {
  id?: string;
  exp?: number | undefined;
}

export interface Payload {
  id: string;
  email: string;
  name: string;
  password: string;
  profile: string;
  active: boolean;
  username: string;
}

export interface Options {
  secret: string;
  expiresIn: string;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  profile: string;
  active: boolean;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserId {
  id: string;
}
