import { Payload, UserResponse } from "@src/@types";
import { authService } from "./createAuhService";
import { BcryptService } from "../modules";

const bcrypt = new BcryptService();
const secret = "secret";

describe("test - auth service factory", () => {
  it("should return user response", async () => {
    const hashPassword = await bcrypt.hash("123456");
    const user: Payload = {
      email: "and@email.com",
      id: "vxy-asd-wer",
      name: "The Guy",
      password: hashPassword,
    };

    const payload = await authService.signInUser("123456", secret, user);

    // console.log(payload);

    expect(payload.id).toEqual(user.id);
  });

  it("should throw error - invalid credentials", async () => {
    const hashPassword = await bcrypt.hash("123456");
    const user: Payload = {
      email: "and@email.com",
      id: "vxy-asd-wer",
      name: "The Guy",
      password: hashPassword,
    };

    try {
      const payload = await authService.signInUser("1234", secret, user);
    } catch (err: any) {
      expect(err.message).toBe("invalid credentials");
    }
  });

  it("should throw error - invalid refresh token", () => {
    try {
      const accessToken = authService.validadeRefreshToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        secret
      );
    } catch (err: any) {
      expect(err.message).toBe("invalid refresh token");
    }
  });

  it("should return user id", async () => {
    const hashPassword = await bcrypt.hash("123456");
    const user: Payload = {
      email: "and@email.com",
      id: "vxy-asd-wer",
      name: "The Guy",
      password: hashPassword,
    };

    const payload = await authService.signInUser("123456", secret, user);

    try {
      const accessToken = authService.validadeAccessToken(
        payload.accessToken,
        secret
      );
      expect(accessToken.id).toEqual(user.id);
    } catch (err: any) {
      expect(err.message).toBe("invalid refresh token");
    }
  });

  it("should throw error invalid access token", async () => {
    const hashPassword = await bcrypt.hash("123456");
    const user: Payload = {
      email: "and@email.com",
      id: "vxy-asd-wer",
      name: "The Guy",
      password: hashPassword,
    };
    try {
      const accessToken = authService.validadeAccessToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCIJ",
        secret
      );
    } catch (err: any) {
      expect(err.message).toBe("invalid access token");
    }
  });
});
