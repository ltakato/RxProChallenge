import {Field, InputType, ObjectType,} from "type-graphql";

import {User} from "../../entities/User";

@InputType()
export class UserSignUpInput implements Partial<User> {
  @Field()
  name: string

  @Field()
  email: string

  @Field()
  password: string
}

@InputType()
export class UserLoginInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string
}

@ObjectType()
export class UserAuthResponse {
  @Field()
  user: User;

  @Field()
  token: string;
}
