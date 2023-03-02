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
  ): Promise<UserResponse | false> {
    const isValide = await this.bcrypt.compare(password, payload.password);

    if (!isValide) {
      return false;
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
      profile: payload.profile,
      username: payload.username,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  validadeRefreshToken(
    token: string,
    secret: string
  ): { accessToken: string | unknown } | false {
    try {
      const payload = this.jwt.checkToken(token, secret);

      if (payload.isLeft()) {
        return false;
      }

      return {
        accessToken: this.jwt.createToken(
          {
            id: payload.value,
          },
          { secret: secret, expiresIn: "15m" }
        ),
      };
    } catch (err) {
      return false;
    }
  }

  validadeAccessToken(token: string, secret: string): UserId | false {
    try {
      const payload = this.jwt.checkToken(token, secret);

      if (payload.isLeft()) {
        return false;
      }

      return {
        id: payload.value.id,
      };
    } catch (err) {
      return false;
    }
  }
}
