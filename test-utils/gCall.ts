import { graphql, GraphQLSchema } from "graphql";
import { Maybe } from 'graphql/jsutils/Maybe';
import {buildSchema} from "type-graphql";

import {UserResolver} from "../graphql/resolvers/userResolver";
import {TitleResolver} from "../graphql/resolvers/titleResolver";
import {customAuthChecker} from "../services/authChecker";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  userId?: number;
}

let schema: GraphQLSchema;

export const gCall = async ({ source, variableValues }: Options) => {
  if (!schema) {
    schema = await buildSchema({
      resolvers: [UserResolver, TitleResolver],
      emitSchemaFile: true,
      authChecker: customAuthChecker
    });
  }
  return graphql({
    schema,
    source,
    variableValues,
    contextValue: {
      user: {
        id: "1",
        name: "test"
      },
      req: {},
      res: {
        clearCookie: jest.fn()
      }
    }
  });
};
