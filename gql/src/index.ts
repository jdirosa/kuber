import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver, EmailResolver } from "./resolvers";
import { Email } from "./models";
import { init } from "./helpers/init";

async function start() {
  const connection = await createConnection();
  const emails = await Email.find({ relations: ["user"] });
  console.log({ emails });
  const schema = await buildSchema({
    resolvers: [UserResolver, EmailResolver]
  });
  await init();

  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);

  console.log(`🚀 Boom! GQL Server running at ${url}`);
}
start();
