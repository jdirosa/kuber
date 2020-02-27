import jwks from "jwks-rsa";
import jwt from "jsonwebtoken";
import { Context } from "./models";
import { AuthenticationError } from "apollo-server";

const algorithms: jwt.Algorithm = "RS256";
export const AUTH_DOMAIN = "dev-8qcsfy5z.auth0.com";
export const AUTH_CLIENT = "cbKRs2a4TccxtxTr2KO5Li1vNG9wd1V8";
const client = jwks({
  jwksUri: `https://${AUTH_DOMAIN}/.well-known/jwks.json`
});
export function getKey(header: jwt.JwtHeader, cb: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.getPublicKey();
    cb(null, signingKey);
  });
}

export const AUTH_OPTIONS = {
  audience: AUTH_CLIENT,
  issuer: `https://${AUTH_DOMAIN}/`,
  algorithms: [algorithms]
};

export async function getAuthUser(ctx: Context): Promise<any> {
  try {
    const user = await ctx.user;
    return user;
  } catch (e) {
    throw new AuthenticationError("You must be logged in to do this");
  }
}
