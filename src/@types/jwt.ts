export interface DecodeOptions {
  complete?: boolean | undefined;
  json?: boolean | undefined;
}

export interface JwtPayload {
  id?: string;
  exp?: number | undefined;
  role?: string;
}

export type Payload = {
  id: string;
  name: string;
  password: string;
  profile: string;
  active?: boolean;
  email?: string;
  phone?: string;
  accessToken?: string;
  refreshToken?: string;
};

export interface Options {
  secret: string;
  expiresIn: string;
}

export interface UserId {
  id: string;
  role: string;
}
