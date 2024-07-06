import { verify } from "jsonwebtoken";

export function authenticateToken(token: string, env: Env): boolean {
  if (!env.JWT_PUB_KEY) {
    throw Error("Expected JWT_PUB_KEY in env");
  }

  try {
    verify(token, env.JWT_PUB_KEY, {
      algorithms: ["RS256"],
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
