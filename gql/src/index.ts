import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver, EmailResolver } from "./resolvers";
import { getKey, AUTH_OPTIONS } from "./auth/auth0";
import jwt from "jsonwebtoken";
import { log, logError } from "./utils";

const VERSION = "0.0.1";
console.log(VERSION);
log(`starting server version ${VERSION}`);
async function start() {
  log("Establishing connection with database ORM");
  try {
    const connection = await createConnection();
  } catch (e) {
    logError("Unable to configure ORM.", e);
    throw new Error("Failled configuring ORM");
  }

  log("Building GQL schema");
  const schema = await buildSchema({
    resolvers: [UserResolver, EmailResolver]
  });

  log("Startting the apollo server");
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      log(`Request from ${req.host}, ${req.baseUrl}`, req.headers);
      // simple auth check on every request
      const token = req.headers.authorization;

      const user = new Promise((resolve, reject) => {
        jwt.verify(token, getKey, AUTH_OPTIONS, (err, decoded: any) => {
          if (err) {
            const msg = "No jwt token found. Returning null for user";
            logError(msg);
            return reject(err);
          }
          resolve(decoded.email);
        });
      });

      return {
        user
      };
    }
  });
  const { url } = await server.listen({ port: 80 });
  console.log(`\nLift Off! 🚀\n\nGQL Server running at ${url}`);
}
start();
