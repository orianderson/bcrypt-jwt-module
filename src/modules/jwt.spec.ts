import { JwtService } from './JwtService';

// jest.setTimeout(30000);

describe('Test JwtService', () => {
  const jwt = new JwtService();

  it('should return token', async () => {
    const token = await jwt.createToken(
      { _id: 'enganderson' },
      { secret: 'secret', expiresIn: '10ms' }
    );

    expect(typeof token).toBe('string');
  });

  it('should throw error, expired', async () => {
    const token = (await jwt.createToken(
      { _id: 'enganderson' },
      { secret: 'secret', expiresIn: '1ms' }
    )) as string;

    try {
      jwt.checkToken(token, 'secret');
    } catch (err: any) {
      expect(err.message).toBe('json web token expired');
    }
  });

  it('should return payload', async () => {
    const token = (await jwt.createToken(
      { _id: 'enganderson' },
      { secret: 'secret', expiresIn: '10ms' }
    )) as string;

    const payload = jwt.decodeToken(token, {}) as { _id: string; exp: number };

    expect(payload._id).toEqual('enganderson');
  });

  it('should throw error, invalid signature', async () => {
    const token = (await jwt.createToken(
      { _id: 'enganderson' },
      { secret: 'secret', expiresIn: '100ms' }
    )) as string;

    try {
      jwt.checkToken(token, 'sec');
    } catch (err: any) {
      expect(err.message).toBe('invalid signature');
    }
  });

  it('should throw error, invalid options', async () => {
    expect(() =>
      jwt.createToken(
        { _id: 'enganderson' },
        { secret: 'secret', expiresIn: null }
      )
    ).toThrowError();
  });

  it('should throw error, message: invalid options', async () => {
    try {
      jwt.createToken(
        { _id: 'enganderson' },
        { secret: 'secret', expiresIn: null }
      );
    } catch (err: any) {
      expect(err.message).toBe(
        '"expiresIn" should be a number of seconds or string representing a timespan'
      );
    }
  });
});
