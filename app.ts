import express from "express";

import { buildApolloServer } from "./graphql"
import expressJwt from "express-jwt";

async function startApolloServer() {
  const app = express();
  const apolloServer = await buildApolloServer();

  const expressJwtOptions = { secret: process.env.SECRET as string, algorithms: ['HS256'], credentialsRequired: false };
  app.use('/graphql', expressJwt(expressJwtOptions));

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  return app
}

export { startApolloServer }
