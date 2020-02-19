import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver, EmailResolver } from "./resolvers";
import { init } from "./helpers/init";

const reSeed = false;
async function start() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver, EmailResolver]
  });
  if (reSeed) {
    await init(reSeed);
  }

  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);

  console.log(`🚀 Boom! GQL Server running at ${url}`);
}
start();
