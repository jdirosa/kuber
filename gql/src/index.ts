import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver, EmailResolver } from "./resolvers";
import { getKey, AUTH_OPTIONS } from "./auth/auth0";
import jwt from "jsonwebtoken";

async function start() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver, EmailResolver]
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // simple auth check on every request
      const token = req.headers.authorization;

      const user = new Promise((resolve, reject) => {
        jwt.verify(token, getKey, AUTH_OPTIONS, (err, decoded: any) => {
          if (err) {
            return reject(err);
          }
          console.log(decoded);
          resolve(decoded.email);
        });
      });

      return {
        user
      };
    }
  });
  const { url } = await server.listen(4000);

  console.log(`🚀 Boom! GQL Server running at ${url}`);
}
start();
