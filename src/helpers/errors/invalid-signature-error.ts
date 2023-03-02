export class InvalidSignatureError extends Error {
  readonly name = "InvalidSignatureError";

  constructor() {
    super("invalid signature");
  }
}
