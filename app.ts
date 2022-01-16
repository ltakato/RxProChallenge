import express from "express";

import { buildApolloServer } from "./graphql"

async function startApolloServer() {
  const app = express();
  const apolloServer = await buildApolloServer()

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  return app
}

export { startApolloServer }
