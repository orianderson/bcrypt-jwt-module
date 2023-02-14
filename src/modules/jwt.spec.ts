import { JwtService } from "./JwtService";

// jest.setTimeout(30000);

describe("Test JwtService", () => {
  const jwt = new JwtService();

  it("should return token", async () => {
    const token = await jwt.createToken(
      { _id: "enganderson" },
      { secret: "secret", expiresIn: "10ms" }
    );

    expect(typeof token).toBe("string");
  });

  it("should throw error, expired", async () => {
    const token = (await jwt.createToken(
      { _id: "enganderson" },
      { secret: "secret", expiresIn: "1ms" }
    )) as string;

    expect(jwt.checkToken(token, "secret")).toEqual("jwt expired");
  });

  it("should return payload", async () => {
    const token = (await jwt.createToken(
      { _id: "enganderson" },
      { secret: "secret", expiresIn: "10ms" }
    )) as string;

    const payload = jwt.decodeToken(token, {}) as { _id: string; exp: number };

    expect(payload._id).toEqual("enganderson");
  });

  it("should throw error, invalid signature", async () => {
    const token = (await jwt.createToken(
      { _id: "enganderson" },
      { secret: "secret", expiresIn: "100ms" }
    )) as string;

    expect(jwt.checkToken(token, "sec")).toEqual("invalid signature");
  });
});
