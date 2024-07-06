import { sign } from "jsonwebtoken";
import crypto from "crypto";

const SIGNING_SECRET = process.env.JWT_SECRET;
const HOST = process.env.HOST;

if (!SIGNING_SECRET) {
  throw Error("No JWT_SECRET var found in env");
}
if (!HOST) {
  throw Error("No HOST var found in environment");
}

export function createRandomToken(): string {
  const userId = `e2e-user-${crypto.randomBytes(14).toString("utf8")}`;

  const token = sign({ userId }, SIGNING_SECRET as string, {
    issuer: HOST,
    expiresIn: "1h",
    subject: "llm_proxy",
  });

  return token;
}
