export class ExpiredTokenError extends Error {
  readonly name = "ExpiredTokenError";

  constructor() {
    super("json wen token expired");
  }
}
