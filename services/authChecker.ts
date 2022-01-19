import {AuthChecker} from "type-graphql";

import {User} from "../entities/User";

export interface Context {
  user?: User;
}

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles,
) => {
  return context.user !== undefined;
};
