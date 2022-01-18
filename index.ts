import {createConnection} from "typeorm";

import { port } from './config/environment';
import { startApolloServer } from './app';

const start = async () => {
  try {
    await createConnection();
    const app = await startApolloServer()

    await app.listen(port);
    console.log(`🚀 GraphQL server running at port: ${port}`);
  } catch(e) {
    console.error(e)
    console.log('Not able to run GraphQL server');
  }
};

start();
