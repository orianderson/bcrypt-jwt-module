import { Payload, UserId } from './../@types';
import { IBcryptService, IJwtService, IAuthService } from '../interfaces';

export class AuthService<I extends Payload> implements IAuthService<I> {
  constructor(
    private readonly bcrypt: IBcryptService,
    private readonly jwt: IJwtService
  ) {}

  async signInUser(
    password: string,
    secret: string,
    payload: I
  ): Promise<I | false> {
    const isValide = await this.bcrypt.compare(password, payload.password);

    delete payload['password'];

    if (!isValide) {
      return false;
    }

    const accessToken = this.jwt.createToken(
      {
        id: payload.id,
        role: payload.profile,
      },
      { secret: secret, expiresIn: '15m' }
    ) as string;

    const refreshToken = this.jwt.createToken(
      {
        id: payload.id,
      },
      { secret: secret, expiresIn: '3d' }
    ) as string;

    return {
      ...payload,
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
            id: payload.value.id,
            role: payload.value.role,
          },
          { secret: secret, expiresIn: '15m' }
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
        role: payload.value.role,
      };
    } catch (err) {
      return false;
    }
  }
}
