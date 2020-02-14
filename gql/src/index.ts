// src/index.ts

import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AuthorResolver, BookResolver, UserResolver } from "./resolvers";
import { init } from "./resolvers/init";

async function start() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [AuthorResolver, BookResolver, UserResolver]
  });
  await init();

  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);

  console.log(`🚀 Boom! Server running at ${url}`);
}
start();
