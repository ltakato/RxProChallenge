import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';

import { env } from '../config/environment';
import {buildSchema} from "type-graphql";
import {TitleResolver} from "./resolvers/titleResolver";

const playgroundPlugin = env.development
  ? ApolloServerPluginLandingPageGraphQLPlayground
  : ApolloServerPluginLandingPageDisabled;

async function buildApolloServer() {
  return new ApolloServer({
    plugins: [playgroundPlugin],
    schema: await buildSchema({
      resolvers: [TitleResolver],
      emitSchemaFile: true
    }),
  });
}

export { buildApolloServer }
