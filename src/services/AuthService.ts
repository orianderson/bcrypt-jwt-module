import { Payload, UserResponse, UserId } from "./../@types";
import { IBcryptService, IJwtService, IAuthService } from "../interfaces";

export class AuthService implements IAuthService {
  constructor(
    private readonly bcrypt: IBcryptService,
    private readonly jwt: IJwtService
  ) {}

  async signInUser(
    password: string,
    secret: string,
    payload: Payload
  ): Promise<UserResponse> {
    const isValide = await this.bcrypt.compare(password, payload.password);

    if (!isValide) {
      throw new Error("invalid credentials");
    }

    const accessToken = this.jwt.createToken(
      {
        id: payload.id,
      },
      { secret: secret, expiresIn: "15m" }
    ) as string;

    const refreshToken = this.jwt.createToken(
      {
        id: payload.id,
      },
      { secret: secret, expiresIn: "3d" }
    ) as string;

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  validadeRefreshToken(
    token: string,
    secret: string
  ): { accessToken: string | unknown } {
    try {
      const payload = this.jwt.checkToken(token, secret) as { id: string };

      return {
        accessToken: this.jwt.createToken(
          {
            id: payload.id,
          },
          { secret: secret, expiresIn: "15m" }
        ),
      };
    } catch (err) {
      throw new Error("invalid refresh token");
    }
  }

  validadeAccessToken(token: string, secret: string): UserId {
    try {
      const payload = this.jwt.checkToken(token, secret) as UserId;

      return payload;
    } catch (err) {
      throw new Error("invalid access token");
    }
  }
}
