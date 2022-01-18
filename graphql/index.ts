import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import {buildSchema} from "type-graphql";

import { env } from '../config/environment';
import {TitleResolver} from "./resolvers/titleResolver";
import {UserResolver} from "./resolvers/userResolver";
import {CustomRequest} from "../CustomRequest";
import {customAuthChecker} from "../services/authChecker";

const playgroundPlugin = env.development
  ? ApolloServerPluginLandingPageLocalDefault
  : ApolloServerPluginLandingPageDisabled;

async function buildApolloServer() {
  return new ApolloServer({
    plugins: [playgroundPlugin],
    schema: await buildSchema({
      resolvers: [UserResolver, TitleResolver],
      emitSchemaFile: true,
      authChecker: customAuthChecker
    }),
    context({ req }: { req: CustomRequest }) {
      return { req, user: req.user }
    }
  });
}

export { buildApolloServer }
