import { verify } from "jsonwebtoken";

export function authenticateToken(token: string, env: Env): boolean {
  if (!env.JWT_SECRET) {
    throw Error("Expected JWT_SECRET in env");
  }

  try {
    verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
      complete: true,
    });
  } catch (error) {
    return false;
  }

  return true;
}

export function parseGritToken(headers: Headers): string | null {
  const authHeader = headers["X-Grit-Api"];

  let authValue = null;
  if (Array.isArray(authHeader)) {
    authValue = authHeader[authHeader.length - 1];
  } else {
    authValue = authHeader;
  }

  if (typeof authValue === "string") {
    return authValue;
  }

  return null;
}
