import { BcryptService } from "./BcryptService";

describe("Test BcryptService", () => {
  const bcrypt = new BcryptService();
  const password = "123456";

  it("should return hash string", async () => {
    expect.assertions(1);

    expect(typeof (await bcrypt.hash(password))).toBe("string");
  });

  it("should be false", async () => {
    const hashPassword = await bcrypt.hash("abc123");

    expect(await bcrypt.compare("123456", hashPassword)).toBeFalsy();
  });

  it("should true", async () => {
    const hashPassword = await bcrypt.hash("abc123");

    expect(await bcrypt.compare("abc123", hashPassword)).toBeTruthy();
  });
});
