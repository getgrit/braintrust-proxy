import { verify } from "jsonwebtoken";
import * as jose from "jose";

export async function authenticateToken(
  token: string,
  env: Env,
): Promise<boolean> {
  if (!env.JWT_PUB_KEY) {
    throw Error("Expected JWT_PUB_KEY in env");
  }

  const pubKey = await jose.importSPKI(env.JWT_PUB_KEY, "RS256");

  try {
    await jose.jwtVerify(token, pubKey, {
      issuer: "grit-llm-router",
    });
  } catch (error) {
    console.error(`Error verifying token ${error}`);
    return false;
  }

  return true;
}

export function parseGritToken(headers: Headers): string | null {
  const authHeader = headers.get("X-Grit-Api");

  return authHeader;
}
