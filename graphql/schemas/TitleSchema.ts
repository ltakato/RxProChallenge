import {Field, InputType, ObjectType} from "type-graphql"
import {Timestamps} from "../../common/common";

@ObjectType()
export class TitleSchema implements Timestamps {
  @Field()
  name: string
  createdAt: Date;
  updatedAt: Date;
}

@InputType()
export class TitleCreateInput implements Partial<TitleSchema> {
  @Field()
  name: string
}

@InputType()
export class TitleUpdateInput implements Partial<TitleSchema> {
  @Field()
  name: string
}
