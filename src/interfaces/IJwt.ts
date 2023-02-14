export interface IJwtService {
  checkToken(token: string): Promise<boolean>;
  createToken(payload: Object): string;
}
