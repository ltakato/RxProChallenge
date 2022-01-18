import {AuthChecker} from "type-graphql";

import {User} from "../entities/User";

export interface Context {
  user?: User;
}

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles,
) => {
  // TODO: teste - cenarios -> sem objeto user;

  return context.user !== undefined;
};
