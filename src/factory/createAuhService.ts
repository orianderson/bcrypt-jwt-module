import { AuthService } from "../services";
import { BcryptService, JwtService } from "../modules";

const createAuthService = () => {
  return new AuthService(new BcryptService(), new JwtService());
};

export const authService = createAuthService();
