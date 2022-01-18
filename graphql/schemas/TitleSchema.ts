import {Field, InputType} from "type-graphql"
import {Title} from "../../entities/Title";

@InputType()
export class TitleCreateInput implements Partial<Title> {
  @Field()
  name: string
}

@InputType()
export class TitleUpdateInput implements Partial<Title> {
  @Field()
  name: string
}
